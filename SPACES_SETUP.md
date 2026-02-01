# Digital Ocean Spaces S3 Integration for Resumes

This document explains how the resume storage system works with Digital Ocean Spaces (S3-compatible storage).

## Architecture

**Before:** PDF files stored as BYTEA in PostgreSQL database
**After:** PDF files stored in Digital Ocean Spaces, only metadata in PostgreSQL

## Files Created/Updated

### New Files
- `lib/s3.ts` - S3 client configuration and upload/delete functions
- `.env.local.example` - Environment variables template
- `migrate_resumes_to_s3.py` - Migration script for existing resumes
- `setup_spaces.sh` - Setup helper script

### Updated Files
- `lib/db.ts` - Added `createResumeS3()` function
- `app/api/resumes/route.ts` - Upload to S3 instead of database
- `app/api/resumes/[id]/route.ts` - Delete from S3 when deleting resume
- `app/api/resumes/[id]/view/route.ts` - Redirect to S3 URL
- `app/api/resumes/[id]/download/route.ts` - Redirect to S3 URL with download header

## Setup Instructions

### 1. Get Digital Ocean Spaces Credentials

**Important:** The personal access token you provided is for the Digital Ocean API, not for Spaces access.

To get Spaces credentials:
1. Log into Digital Ocean: https://cloud.digitalocean.com
2. Go to API → Spaces Keys: https://cloud.digitalocean.com/account/api/spaces
3. Click "Generate New Key"
4. Copy the **Key** and **Secret**
5. Create a new Space (bucket) named "klyve-resumes"

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Digital Ocean Spaces Configuration
SPACES_ENDPOINT=https://nyc3.digitaloceanspaces.com  # Change to your region
SPACES_REGION=us-east-1
SPACES_ACCESS_KEY_ID=your_spaces_key_here
SPACES_SECRET_ACCESS_KEY=your_spaces_secret_here
SPACES_BUCKET=klyve-resumes
```

### 3. Install Dependencies

```bash
npm install
```

The AWS SDK should already be installed (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)

### 4. Test S3 Configuration

Run the test script to verify S3 is configured:

```bash
node -e "const s3 = require('./lib/s3'); console.log('S3 Configured:', s3.isS3Configured())"
```

### 5. Migrate Existing Resumes

Run the migration script to move existing PDFs from database to S3:

```bash
python3 migrate_resumes_to_s3.py
```

This will:
- Upload each resume PDF to Spaces
- Update the database with the S3 URL
- Clear the file_data column (freeing up database space)

### 6. Restart the Application

```bash
npm run dev
```

## How It Works

### Upload Flow
1. User uploads PDF via frontend
2. Frontend sends file to `/api/resumes`
3. API uploads file to S3/Spaces
4. API saves metadata + S3 URL to database
5. No file data stored in database!

### View Flow
1. User views resume
2. Frontend requests `/api/resumes/[id]/view`
3. API returns redirect to S3 URL
4. PDF loads directly from Spaces

### Delete Flow
1. User deletes resume
2. Frontend sends DELETE to `/api/resumes/[id]`
3. API deletes file from S3
4. API deletes record from database

## Database Schema

The `resumes` table now uses:
- `file_url` - S3 URL (e.g., https://nyc3.digitaloceanspaces.com/klyve-resumes/resumes/12345-file.pdf)
- `file_data` - Now NULL for S3 resumes (kept for backward compatibility with legacy resumes)

## Benefits

✅ **Reduced Database Size** - No more storing PDF blobs in PostgreSQL  
✅ **Better Performance** - Files served directly from CDN  
✅ **Scalability** - S3 can handle unlimited storage  
✅ **Cost Effective** - Spaces is cheaper than database storage  
✅ **Faster Backups** - Database backups are smaller without file data  

## Troubleshooting

### "S3 storage not configured" Error
Check your `.env.local` file has all required variables and restart the server.

### Migration Script Can't Import S3 Module
The Python migration script needs the AWS SDK to be installed. Make sure you've run `npm install` first.

Alternatively, you can manually migrate by:
1. Downloading each PDF from the database
2. Uploading to Spaces via the Digital Ocean console
3. Updating the database with the URLs

### Files Not Showing After Migration
Make sure your Space is public or has proper CORS settings. Check the file_url in the database exists.

## Security Considerations

- Files are uploaded with `public-read` ACL (anyone with URL can view)
- For private resumes, modify `lib/s3.ts` to use presigned URLs instead
- Keep your Spaces credentials in `.env.local` (never commit to git)
- The personal access token is not used for S3 - use Spaces keys instead

## Testing

Upload a new resume and verify:
1. File appears in Digital Ocean Spaces console
2. Database shows file_url, not file_data
3. Resume displays correctly in the app
4. Download button works
5. Delete removes file from both S3 and database

## Support

For Digital Ocean Spaces issues:
- Documentation: https://docs.digitalocean.com/products/spaces/
- API Reference: https://docs.digitalocean.com/reference/api/spaces-api/

For MinIO client:
- Documentation: https://min.io/docs/minio/linux/index.html

## Migration Complete Checklist

- [ ] Spaces bucket created
- [ ] Spaces keys generated
- [ ] `.env.local` configured
- [ ] Dependencies installed
- [ ] Migration script run successfully
- [ ] Test upload works
- [ ] Test view works
- [ ] Test download works
- [ ] Test delete works
- [ ] Legacy resumes still accessible
- [ ] Database size reduced

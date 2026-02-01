import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Digital Ocean Spaces Configuration
// Provided credentials for sfo3 region
const SPACES_CONFIG = {
  endpoint: process.env.SPACES_ENDPOINT || 'https://sfo3.digitaloceanspaces.com',
  region: process.env.SPACES_REGION || 'us-east-1', // DO Spaces uses this for compatibility
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID || 'DO00KWJBK3TTFKBUZ34A',
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY || '5RNH3xXg8gJU720SLaC+5/qYDmJsB4KT1CKP2IHxHrQ',
  },
  bucket: process.env.SPACES_BUCKET || 'klyve-resumes',
};

// Initialize S3 client (compatible with Digital Ocean Spaces)
const s3Client = new S3Client({
  endpoint: SPACES_CONFIG.endpoint,
  region: SPACES_CONFIG.region,
  credentials: SPACES_CONFIG.credentials,
  forcePathStyle: false, // Required for Digital Ocean Spaces
});

/**
 * Upload a file to S3/Spaces
 */
export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const key = `resumes/${Date.now()}-${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: SPACES_CONFIG.bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: 'public-read', // Make file publicly accessible
  });

  await s3Client.send(command);
  
  // Return the public URL
  return `${SPACES_CONFIG.endpoint}/${SPACES_CONFIG.bucket}/${key}`;
}

/**
 * Get a presigned URL for viewing/downloading (optional, for private files)
 */
export async function getSignedDownloadUrl(fileKey: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: SPACES_CONFIG.bucket,
    Key: fileKey,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Delete a file from S3/Spaces
 */
export async function deleteFromS3(fileUrl: string): Promise<void> {
  // Extract key from URL
  const urlParts = fileUrl.split(`/${SPACES_CONFIG.bucket}/`);
  if (urlParts.length < 2) {
    throw new Error('Invalid S3 URL');
  }
  const key = urlParts[1];
  
  const command = new DeleteObjectCommand({
    Bucket: SPACES_CONFIG.bucket,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Check if S3 is configured
 */
export function isS3Configured(): boolean {
  return !!(
    SPACES_CONFIG.credentials.accessKeyId &&
    SPACES_CONFIG.credentials.secretAccessKey &&
    SPACES_CONFIG.bucket
  );
}

/**
 * Extract file key from S3 URL
 */
export function getFileKeyFromUrl(fileUrl: string): string | null {
  const urlParts = fileUrl.split(`/${SPACES_CONFIG.bucket}/`);
  if (urlParts.length < 2) {
    return null;
  }
  return urlParts[1];
}

export { SPACES_CONFIG };

#!/bin/bash
# Digital Ocean Spaces Configuration
# This script configures MinIO client for Digital Ocean Spaces

# Configuration
SPACES_ENDPOINT="nyc3.digitaloceanspaces.com"  # Change this to your region
SPACES_BUCKET="klyve-resumes"  # Bucket name
ACCESS_TOKEN="${DIGITALOCEAN_TOKEN:-YOUR_DO_TOKEN_HERE}"

# Note: For Spaces access, you need Spaces Access Key and Secret Key, not the personal access token
# The personal access token is for the Digital Ocean API, not for S3/Spaces API
# You need to generate Spaces keys in the Digital Ocean console:
# https://cloud.digitalocean.com/account/api/spaces

echo "Digital Ocean Spaces Configuration"
echo "=================================="
echo ""
echo "IMPORTANT: To use Digital Ocean Spaces with MinIO, you need:"
echo "1. Spaces Access Key (different from personal access token)"
echo "2. Spaces Secret Key"
echo "3. Spaces endpoint URL (e.g., nyc3.digitaloceanspaces.com)"
echo "4. Bucket name"
echo ""
echo "The personal access token you provided is for the Digital Ocean API,"
echo "not for S3/Spaces access."
echo ""
echo "To get your Spaces keys:"
echo "1. Go to https://cloud.digitalocean.com/account/api/spaces"
echo "2. Click 'Generate New Key'"
echo "3. Copy the Key and Secret"
echo ""
echo "Then run:"
echo "mc alias set do s3.$SPACES_ENDPOINT YOUR_KEY YOUR_SECRET"
echo ""
echo "Current token provided: ${ACCESS_TOKEN:0:20}..."

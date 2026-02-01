#!/bin/bash
# Setup Digital Ocean Spaces bucket and migrate resumes

set -e

echo "🚀 Setting up Digital Ocean Spaces"
echo "=================================="
echo ""

# Configuration
ENDPOINT="sfo3.digitaloceanspaces.com"
BUCKET="klyve-resumes"
ACCESS_KEY="DO00KWJBK3TTFKBUZ34A"
SECRET_KEY="5RNH3xXg8gJU720SLaC+5/qYDmJsB4KT1CKP2IHxHrQ"

echo "📍 Configuration:"
echo "   Endpoint: $ENDPOINT"
echo "   Bucket: $BUCKET"
echo ""

# Check if mc (MinIO client) is available
if [ ! -f "/tmp/mc" ]; then
    echo "📥 Downloading MinIO client..."
    curl -sL https://dl.min.io/client/mc/release/linux-amd64/mc -o /tmp/mc
    chmod +x /tmp/mc
fi

echo "🔧 Configuring MinIO client..."
/tmp/mc alias set do "https://$ENDPOINT" "$ACCESS_KEY" "$SECRET_KEY" --api s3v4

echo ""
echo "📦 Creating bucket (if not exists)..."
/tmp/mc mb "do/$BUCKET" --region sfo3 --ignore-existing || true

echo ""
echo "🔓 Setting bucket policy to public..."
/tmp/mc policy set public "do/$BUCKET" || true

echo ""
echo "✅ Bucket setup complete!"
echo ""
echo "📋 Bucket Info:"
/tmp/mc stat "do/$BUCKET" || true

echo ""
echo "🚀 Ready to migrate resumes!"
echo "   Run: python3 migrate_resumes_to_s3.py"
echo ""

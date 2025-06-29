# IOT Smart Home - Backend Configuration

## Setup Instructions

### 1. Firebase Service Account Setup

1. Go to your Firebase Console
2. Navigate to Project Settings > Service Accounts
3. Click "Generate new private key"
4. Save the downloaded file as `smartmonitoringsystem-8e77c-firebase-adminsdk-hu6uu-1331ff2ea7.json` in this directory
5. Or use the template file `firebase-config.template.json` and rename it to the correct filename

### 2. AWS/Server Configuration

1. Place your AWS PEM key file as `SmartHome.pem` in this directory
2. Ensure proper permissions: `chmod 400 SmartHome.pem` (on Unix systems)

### 3. Environment Variables

Create a `.env` file in this directory with the following variables:
```
FIREBASE_PROJECT_ID=your-project-id
AWS_REGION=your-aws-region
# Add other environment variables as needed
```

## Important Security Notes

⚠️ **Never commit sensitive files to version control!**

- All `.json` files containing Firebase credentials are ignored
- All `.pem` files are ignored
- All `.env` files are ignored

These files should be:
- Stored securely on your local machine
- Shared through secure channels only
- Added to your deployment environment separately

## Files to Keep Secure

- `smartmonitoringsystem-8e77c-firebase-adminsdk-hu6uu-1331ff2ea7.json`
- `SmartHome.pem`
- `.env`
- Any other credential files

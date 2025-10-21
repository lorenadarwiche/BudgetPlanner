# EmailJS Setup Guide

This guide will help you set up real email sending for verification codes.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps for your provider
5. Click **Create Service**
6. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: Verify Your Budget Tracker Account

Hi {{to_name}},

Welcome to Budget Tracker! 

Your verification code is: {{verification_code}}

Please enter this code in the verification page to complete your registration.

This code will expire in 10 minutes.

If you didn't create this account, please ignore this email.

Best regards,
Budget Tracker Team
```

4. Set these template variables:
   - `to_name`: Recipient's name
   - `to_email`: Recipient's email
   - `verification_code`: The 6-digit code
   - `app_name`: Budget Tracker

5. Click **Save**
6. **Copy the Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy it**

## Step 5: Configure Your App

### Option A: Using .env file (Recommended)

1. In your project root, create a file named `.env`
2. Add your credentials:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Save the file
4. Restart your development server:
```bash
npm start
```

### Option B: Direct Configuration

Edit `src/services/emailService.js` and replace the placeholders:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_xxxxxxx',
  templateId: 'template_xxxxxxx',
  publicKey: 'your_public_key_here'
};
```

## Step 6: Test It!

1. Start your app: `npm start`
2. Create a new account with a real email address
3. Check your email inbox (and spam folder)
4. Enter the 6-digit code from the email

## Troubleshooting

### Emails not arriving?

1. **Check spam folder** - First time emails often go to spam
2. **Verify email service** - Make sure your email service is connected in EmailJS
3. **Check template** - Ensure template variables match exactly
4. **Free tier limits** - EmailJS free tier allows 200 emails/month

### Still in demo mode?

1. Check that `.env` file exists and has correct values
2. Restart the development server after creating `.env`
3. Check browser console for any error messages

### Testing with Gmail?

If using Gmail:
1. You may need to enable "Less secure app access" or use App Passwords
2. Check your Gmail "Sent" folder to confirm emails are being sent

## Free Tier Limits

- **200 emails per month**
- **2 email services**
- **Unlimited templates**

Perfect for testing and small applications!

## Security Notes

- Never commit your `.env` file to Git
- The `.env` file is already in `.gitignore`
- Keep your credentials private
- For production, consider using environment variables on your hosting platform

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

---

**Important**: Once configured, the verification code will be sent to the user's email and will NOT be displayed on screen. Users must check their email to get the code.

import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Get your credentials from: https://www.emailjs.com/
const EMAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

// Initialize EmailJS
if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

export const sendVerificationEmail = async (email, name, verificationCode) => {
  // Check if EmailJS is configured
  if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID' || 
      EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID' || 
      EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('EmailJS not configured. Using demo mode.');
    // Return success in demo mode
    return {
      success: true,
      demo: true,
      message: 'Demo mode: Email not sent. Code displayed on screen.'
    };
  }

  try {
    console.log('Attempting to send email with config:', {
      serviceId: EMAILJS_CONFIG.serviceId,
      templateId: EMAILJS_CONFIG.templateId,
      publicKeyLength: EMAILJS_CONFIG.publicKey?.length
    });

    const templateParams = {
      to_email: email,
      to_name: name,
      verification_code: verificationCode,
      app_name: 'Budget Tracker'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('EmailJS response:', response);

    if (response.status === 200) {
      return {
        success: true,
        demo: false,
        message: 'Verification code sent to your email'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending error details:', {
      message: error.message,
      text: error.text,
      status: error.status,
      fullError: error
    });
    throw new Error(`Failed to send verification email: ${error.text || error.message}`);
  }
};

export const isEmailConfigured = () => {
  return EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' && 
         EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' && 
         EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';
};

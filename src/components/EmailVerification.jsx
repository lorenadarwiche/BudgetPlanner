import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const EmailVerification = ({ email, verificationCode, onVerified, onResendCode, isDemo = true }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setCode(newCode);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    document.getElementById(`code-${lastIndex}`)?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredCode = code.join('');

    if (enteredCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // If in demo mode, check locally. Otherwise, let the backend verify
    if (isDemo && verificationCode) {
      if (enteredCode === verificationCode) {
        onVerified();
      } else {
        setError('Invalid verification code. Please try again.');
        setCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
      }
      setLoading(false);
    } else {
      // Real mode - pass the code to the backend for verification
      try {
        await onVerified(enteredCode);
        // If successful, component will unmount (user logged in)
      } catch (error) {
        setError(error.message || 'Invalid verification code. Please try again.');
        setCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
        setLoading(false);
      }
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    onResendCode();
    setTimer(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-secondary/10 to-primary/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 transition-colors duration-200">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-white to-warning/10 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl p-8 border border-warning/50 dark:border-gray-600">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-warning to-accent dark:from-yellow-600 dark:to-orange-500 p-4 rounded-2xl shadow-lg mb-4 relative">
              <Mail className="w-12 h-12 text-gray-800 dark:text-white" />
              <div className="absolute -top-1 -right-1 bg-success p-1 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Verify Your Email</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We've sent a 6-digit code to
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
              {email}
            </p>
          </div>

          {/* Demo Code Display - Only show in demo mode */}
          {isDemo && verificationCode && (
            <div className="mb-6 bg-primary/20 dark:bg-blue-900/30 border-2 border-primary dark:border-blue-700 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                📧 Demo Mode - Your verification code:
              </p>
              <p className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 tracking-widest font-mono">
                {verificationCode}
              </p>
            </div>
          )}

          {/* Email Sent Confirmation */}
          {!isDemo && (
            <div className="mb-6 bg-success/20 dark:bg-green-900/30 border-2 border-success dark:border-green-700 rounded-xl p-4 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  Verification code sent!
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Please check your email inbox and spam folder.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Code Input */}
          <form onSubmit={handleVerify}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-center space-x-2" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-warning focus:border-warning transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || code.join('').length !== 6}
              className="w-full bg-gradient-to-r from-warning to-accent dark:from-yellow-600 dark:to-orange-500 hover:shadow-xl text-gray-800 dark:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Didn't receive the code?
            </p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Resend Code</span>
              </button>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Resend available in <span className="font-semibold">{timer}s</span>
              </p>
            )}
          </div>

          {/* Info */}
          {isDemo && (
            <div className="mt-6 bg-secondary/30 dark:bg-gray-700/50 border-2 border-secondary dark:border-gray-600 rounded-xl p-4">
              <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
                <strong>Demo Note:</strong> EmailJS is not configured. 
                The verification code is displayed above for testing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

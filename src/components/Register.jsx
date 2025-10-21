import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import EmailVerification from './EmailVerification';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const { register, verifyEmail, resendVerificationCode } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Show verification screen
      setVerificationData({
        userId: result.user.id,
        name: result.user.name,
        email: result.user.email,
        verificationCode: result.verificationCode, // null if email sent, code if demo
        isDemo: result.isDemo
      });
      setShowVerification(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return null;
    if (password.length < 6) return { text: 'Weak', color: 'text-red-600', bg: 'bg-red-200' };
    if (password.length < 10) return { text: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-200' };
    return { text: 'Strong', color: 'text-green-600', bg: 'bg-green-200' };
  };

  const strength = passwordStrength();

  const handleVerified = async () => {
    try {
      await verifyEmail(verificationData.userId, verificationData.verificationCode);
      // User will be logged in automatically after verification
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendCode = async () => {
    try {
      const result = await resendVerificationCode(verificationData.email, verificationData.name);
      setVerificationData({
        ...verificationData,
        verificationCode: result.verificationCode,
        isDemo: result.isDemo
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Show verification screen if registration was successful
  if (showVerification) {
    return (
      <EmailVerification
        email={verificationData.email}
        verificationCode={verificationData.verificationCode}
        onVerified={handleVerified}
        onResendCode={handleResendCode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-secondary/10 to-primary/10 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-white to-success/10 rounded-3xl shadow-2xl p-8 border border-success/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-success to-secondary p-4 rounded-2xl shadow-lg mb-4">
              <UserPlus className="w-12 h-12 text-gray-800" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Start tracking your finances today</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white"
                />
              </div>
              {strength && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.bg} transition-all duration-300`} style={{ width: strength.text === 'Weak' ? '33%' : strength.text === 'Medium' ? '66%' : '100%' }}></div>
                  </div>
                  <span className={`text-xs font-medium ${strength.color}`}>{strength.text}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-success focus:border-success transition-all duration-200 bg-white"
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-success to-secondary hover:shadow-xl text-gray-800 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 bg-warning/30 border-2 border-warning rounded-xl p-4">
            <p className="text-xs text-gray-700 text-center">
              <strong>Demo Note:</strong> This is a client-side demo. Data is stored in your browser's localStorage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

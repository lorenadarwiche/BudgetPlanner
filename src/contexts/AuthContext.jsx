import React, { createContext, useState, useContext, useEffect } from 'react';
import { sendVerificationEmail } from '../services/emailService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send verification email
    const emailResult = await sendVerificationEmail(
      userData.email,
      userData.name,
      verificationCode
    );

    // Create new user (unverified)
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      verified: false,
      verificationCode: verificationCode,
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Return user data with verification code (only in demo mode)
    return { 
      user: newUser, 
      verificationCode: emailResult.demo ? verificationCode : null,
      emailSent: emailResult.success,
      isDemo: emailResult.demo
    };
  };

  const verifyEmail = (userId, code) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const user = users[userIndex];
    
    if (user.verificationCode !== code) {
      throw new Error('Invalid verification code');
    }

    // Mark as verified
    users[userIndex].verified = true;
    users[userIndex].verificationCode = null;
    localStorage.setItem('users', JSON.stringify(users));

    // Log the user in
    const userWithoutPassword = { ...users[userIndex] };
    delete userWithoutPassword.password;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const resendVerificationCode = async (email, name) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Generate new code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send verification email
    const emailResult = await sendVerificationEmail(
      email,
      name,
      verificationCode
    );

    users[userIndex].verificationCode = verificationCode;
    localStorage.setItem('users', JSON.stringify(users));

    return {
      verificationCode: emailResult.demo ? verificationCode : null,
      emailSent: emailResult.success,
      isDemo: emailResult.demo
    };
  };

  const login = (email, password) => {
    // Get users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if email is verified
    if (!user.verified) {
      throw new Error('Please verify your email before logging in');
    }

    // Log the user in
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    verifyEmail,
    resendVerificationCode,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

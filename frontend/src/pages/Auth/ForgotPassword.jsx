import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [formData, setFormData] = useState({
    email: '',
    rollNumber: '',
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(120); // 2 minutes timer
  const [canResend, setCanResend] = useState(false);

  // Timer countdown for OTP
  React.useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => {
          if (timer === 1) {
            setCanResend(true);
          }
          return timer - 1;
        });
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData(prev => ({
        ...prev,
        otp: newOtp
      }));

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    } else if (formData.rollNumber.length < 6) {
      newErrors.rollNumber = 'Please enter a valid roll number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const otpString = formData.otp.join('');
    if (otpString.length !== 6) {
      setErrors({ otp: 'Please enter the complete 6-digit OTP' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setStep(2);
    setTimer(120);
    setCanResend(false);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setStep(3);
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setStep(4);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    
    // Simulate resend OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTimer(120);
    setCanResend(false);
    setLoading(false);
    setFormData(prev => ({
      ...prev,
      otp: ['', '', '', '', '', '']
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary p-3 rounded-full inline-block mb-4">
            <span className="text-white text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Reset Password</h1>
          <p className="text-slate-600">
            {step === 1 && "Enter your details to reset your password"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create a new secure password"}
            {step === 4 && "Password reset successful!"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  stepNumber <= step
                    ? 'bg-primary text-white'
                    : stepNumber === step + 1
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {stepNumber < step ? '✓' : stepNumber}
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Step 1: Email and Roll Number */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.email ? 'border-danger' : 'border-slate-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  <span className="absolute left-4 top-3.5 text-slate-400 text-lg">📧</span>
                </div>
                {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Roll Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.rollNumber ? 'border-danger' : 'border-slate-300'
                    }`}
                    placeholder="Enter your roll number"
                  />
                  <span className="absolute left-4 top-3.5 text-slate-400 text-lg">🎓</span>
                </div>
                {errors.rollNumber && <p className="text-danger text-sm mt-1">{errors.rollNumber}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-slate-600 mb-2">
                  We've sent a 6-digit code to
                </p>
                <p className="font-medium text-slate-800">{formData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4 text-center">
                  Enter OTP
                </label>
                <div className="flex justify-center space-x-3 mb-4">
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={1}
                    />
                  ))}
                </div>
                {errors.otp && <p className="text-danger text-sm text-center">{errors.otp}</p>}
              </div>

              <div className="text-center">
                <p className="text-slate-600 text-sm mb-2">
                  Didn't receive the code?
                </p>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-slate-500 text-sm">
                    Resend in {formatTime(timer)}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleStep3Submit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.newPassword ? 'border-danger' : 'border-slate-300'
                    }`}
                    placeholder="Enter new password"
                  />
                  <span className="absolute left-4 top-3.5 text-slate-400 text-lg">🔒</span>
                </div>
                {errors.newPassword && <p className="text-danger text-sm mt-1">{errors.newPassword}</p>}
                <p className="text-slate-500 text-xs mt-1">
                  Must contain uppercase, lowercase, number and be 8+ characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.confirmPassword ? 'border-danger' : 'border-slate-300'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <span className="absolute left-4 top-3.5 text-slate-400 text-lg">🔐</span>
                </div>
                {errors.confirmPassword && <p className="text-danger text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="bg-success/10 p-6 rounded-2xl">
                <div className="text-success text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Password Reset Successful!
                </h3>
                <p className="text-slate-600">
                  Your password has been reset successfully. You can now login with your new password.
                </p>
              </div>

              <Link
                to="/login"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-medium transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Go to Login</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <Link 
            to="/login" 
            className="text-slate-600 hover:text-primary transition-colors text-sm"
          >
            ← Back to Login
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mt-6 border border-white/20">
          <h4 className="font-medium text-slate-800 mb-2 text-center">Need Help?</h4>
          <div className="text-center space-y-1 text-sm text-slate-600">
            <p>📞 Contact IT Support: +1 (555) 123-4567</p>
            <p>📧 Email: support@campusos.edu</p>
            <p>🕒 Available: Mon-Fri, 9 AM - 6 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

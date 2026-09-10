import { useState } from 'react';
import { FarmerUser, FarmerType } from '../types.ts';
import {
  Sprout,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Tractor,
} from 'lucide-react';

interface AuthCardProps {
  onAuthSuccess: (user: FarmerUser) => void;
  onNavigateHome?: () => void;
  initialMode?: 'login' | 'signup';
}

const FARMER_TYPES: FarmerType[] = [
  'Crop Farmer',
  'Dairy Farmer',
  'Horticulture Farmer',
  'Poultry Farmer',
  'Organic Farmer',
  'Mixed Agriculture',
  'Other',
];

export function AuthCard({ onAuthSuccess, onNavigateHome, initialMode = 'signup' }: AuthCardProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [farmerType, setFarmerType] = useState<FarmerType>('Crop Farmer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation & status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const handleToggleMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setErrors({});
    setGeneralError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check stored registered users in local storage
    try {
      const storedUsersRaw = localStorage.getItem('registered_farmers');
      const registeredUsers: FarmerUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      const foundUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (foundUser) {
        if (foundUser.password && foundUser.password !== password) {
          setGeneralError('Invalid password. Please try again.');
          return;
        }
        // Save current logged in user
        localStorage.setItem('current_farmer', JSON.stringify(foundUser));
        onAuthSuccess(foundUser);
      } else {
        // If no user exists yet with this email, create a session user or prompt
        const sessionUser: FarmerUser = {
          id: 'farmer-' + Date.now(),
          fullName: email.split('@')[0].replace(/[._]/g, ' ') || 'Farmer Member',
          email: email.trim(),
          phoneNumber: '+91 98765 43210',
          farmerType: 'Crop Farmer',
          registeredAt: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
        };

        // Add to registered list
        const updatedList = [...registeredUsers, sessionUser];
        localStorage.setItem('registered_farmers', JSON.stringify(updatedList));
        localStorage.setItem('current_farmer', JSON.stringify(sessionUser));
        onAuthSuccess(sessionUser);
      }
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    const newErrors: Record<string, string> = {};

    // 1. Full Name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }

    // 2. Email
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email format (e.g., name@example.com).';
    }

    // 3. Phone Number
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    // 4. Password
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // 5. Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // 6. Farmer Type
    if (!farmerType) {
      newErrors.farmerType = 'Please select your farmer type.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create user object
    const newUser: FarmerUser = {
      id: 'farmer-' + Date.now(),
      fullName: fullName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      farmerType: farmerType,
      registeredAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      password: password,
    };

    try {
      // Store in registered list and set as current
      const storedUsersRaw = localStorage.getItem('registered_farmers');
      const registeredUsers: FarmerUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const updatedList = [
        ...registeredUsers.filter((u) => u.email.toLowerCase() !== newUser.email.toLowerCase()),
        newUser,
      ];

      localStorage.setItem('registered_farmers', JSON.stringify(updatedList));
      localStorage.setItem('current_farmer', JSON.stringify(newUser));

      onAuthSuccess(newUser);
    } catch {
      setGeneralError('Could not save data to local storage. Please check browser storage settings.');
    }
  };

  return (
    <div id="auth-page-container" className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#97BC62]/15 via-emerald-50/40 to-slate-50">
      <div className="w-full max-w-lg">
        {/* Navigation Breadcrumb / Back button */}
        {onNavigateHome && (
          <div className="mb-4 flex justify-between items-center text-xs">
            <button
              id="back-to-challenges-btn"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-[#2C5F2D] font-semibold hover:underline cursor-pointer"
            >
              ← Back to Field Challenges
            </button>
            <span className="text-slate-500">Agri-Tech Portal</span>
          </div>
        )}

        {/* Centered Form Card */}
        <div
          id="auth-card"
          className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_12px_40px_-8px_rgba(44,95,45,0.14)] overflow-hidden"
        >
          {/* Header Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-[#2C5F2D] via-[#97BC62] to-[#C1610B]" />

          <div className="p-6 sm:p-8">
            {/* Top Brand & Icon */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#2C5F2D] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Tractor className="w-6 h-6" />
              </div>
              <h2 id="auth-card-title" className="text-2xl font-extrabold text-[#2C5F2D] tracking-tight">
                {mode === 'signup' ? 'Farmer Registration' : 'Farmer Login'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {mode === 'signup'
                  ? 'Join the AI-powered smart agriculture community'
                  : 'Access your personalized smart farm dashboard'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div id="auth-mode-tabs" className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-xl mb-6 text-sm font-semibold">
              <button
                id="tab-login"
                type="button"
                onClick={() => handleToggleMode('login')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-[#2C5F2D] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Login
              </button>
              <button
                id="tab-signup"
                type="button"
                onClick={() => handleToggleMode('signup')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-[#2C5F2D] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* General Error Banner */}
            {generalError && (
              <div id="auth-general-error" className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#C1610B] shrink-0" />
                <span>{generalError}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' && (
              <form id="login-form" onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-[#C1610B]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="farmer@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                        errors.email
                          ? 'border-amber-400 focus:ring-amber-200'
                          : 'border-slate-200 focus:border-[#2C5F2D] focus:ring-[#97BC62]/30'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p id="error-login-email" className="text-xs text-[#C1610B] mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-[#C1610B]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                        errors.password
                          ? 'border-amber-400 focus:ring-amber-200'
                          : 'border-slate-200 focus:border-[#2C5F2D] focus:ring-[#97BC62]/30'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="error-login-password" className="text-xs text-[#C1610B] mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="submit-login-btn"
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-[#2C5F2D] hover:bg-[#204721] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Log In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Switch link */}
                <p className="text-center text-xs text-slate-600 pt-2">
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => handleToggleMode('signup')}
                    className="font-bold text-[#2C5F2D] hover:text-[#C1610B] hover:underline cursor-pointer"
                  >
                    Sign Up here
                  </button>
                </p>
              </form>
            )}

            {/* SIGN UP FORM */}
            {mode === 'signup' && (
              <form id="signup-form" onSubmit={handleSignUp} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label htmlFor="signup-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-[#C1610B]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ranjith Kumar"
                      className={`w-full pl-10 pr-4 py-2 text-sm bg-slate-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                        errors.fullName
                          ? 'border-amber-400 focus:ring-amber-200'
                          : 'border-slate-200 focus:border-[#2C5F2D] focus:ring-[#97BC62]/30'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="error-signup-name" className="text-xs text-[#C1610B] mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="signup-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-[#C1610B]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ranjith@example.com"
                      className={`w-full pl-10 pr-4 py-2 text-sm bg-slate-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                        errors.email
                          ? 'border-amber-400 focus:ring-amber-200'
                          : 'border-slate-200 focus:border-[#2C5F2D] focus:ring-[#97BC62]/30'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p id="error-signup-email" className="text-xs text-[#C1610B] mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number & Farmer Type (2 cols on sm) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="signup-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-[#C1610B]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signup-phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 9876543210"
                        className={`w-full pl-10 pr-3 py-2 text-sm bg-slate-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                          errors.phoneNumber
                            ? 'border-amber-400 focus:ring-amber-200'
                            : 'border-slate-200 focus:border-[#2C5F2D] focus:ring-[#97BC62]/30'
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p id="error-signup-phone" className="text-xs text-[#C1610B] mt-1 font-medium">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="signup-farmer-type" className="block text-xs font-semibold text-slate-700 mb-1">
                      Farmer Type <span className="text-[#C1610B]">*</span>
                    </label>
                    <select
                      id="signup-farmer-type"
                      value={farmerType}
                      onChange={(e) => setFarmerType(e.target.value as FarmerType)}
                      className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#2C5F2D] focus:ring-2 focus:ring-[#97BC62]/30 focus:bg-white transition-all text-slate-800"
                    >
                      {FARMER_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Password & Confirm Password (2 cols on sm) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-700 mb-1">
                      Password <span className="text-[#C1610B]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        className={`w-full pl-10 pr-9 py-2 text-sm bg-slate-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                          errors.password
                            ? 'border-amber-400 focus:ring-amber-200'
                            : 'border-slate-200 focus:border-[#2C5F2D] focus:ring-[#97BC62]/30'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p id="error-signup-password" className="text-xs text-[#C1610B] mt-1 font-medium">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="signup-confirm-password" className="block text-xs font-semibold text-slate-700 mb-1">
                      Confirm Password <span className="text-[#C1610B]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className={`w-full pl-10 pr-9 py-2 text-sm bg-slate-50/50 border rounded-xl focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                          errors.confirmPassword
                            ? 'border-amber-400 focus:ring-amber-200'
                            : 'border-slate-200 focus:border-[#2C5F2D] focus:ring-[#97BC62]/30'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="error-signup-confirm" className="text-xs text-[#C1610B] mt-1 font-medium">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  id="submit-signup-btn"
                  type="submit"
                  className="w-full mt-3 py-3 px-4 rounded-xl bg-[#2C5F2D] hover:bg-[#204721] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#97BC62]" />
                  <span>Complete Farmer Sign Up</span>
                </button>

                {/* Switch link */}
                <p className="text-center text-xs text-slate-600 pt-1">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => handleToggleMode('login')}
                    className="font-bold text-[#2C5F2D] hover:text-[#C1610B] hover:underline cursor-pointer"
                  >
                    Log In to your account
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

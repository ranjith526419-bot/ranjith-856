import { FarmerUser } from '../types.ts';
import {
  User,
  Mail,
  Phone,
  Tractor,
  Calendar,
  LogOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  ScanEye,
  TrendingUp,
} from 'lucide-react';

interface FarmerDashboardProps {
  user: FarmerUser;
  onLogout: () => void;
  onViewChallenges: () => void;
}

export function FarmerDashboard({ user, onLogout, onViewChallenges }: FarmerDashboardProps) {
  return (
    <div id="farmer-dashboard-container" className="min-h-[calc(100vh-4rem)] p-4 sm:p-8 bg-gradient-to-b from-[#97BC62]/10 via-emerald-50/40 to-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div
          id="dashboard-welcome-banner"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden"
        >
          {/* Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2C5F2D] via-[#97BC62] to-[#C1610B]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#2C5F2D] text-white flex items-center justify-center text-xl font-bold shadow-md">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#97BC62]">
                    Smart Farmer Member
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-[#2C5F2D]">
                    <ShieldCheck className="w-3 h-3" /> Active Profile
                  </span>
                </div>
                <h1 id="dashboard-welcome-heading" className="text-2xl sm:text-3xl font-extrabold text-[#2C5F2D] tracking-tight">
                  Welcome, {user.fullName}!
                </h1>
                <p className="text-sm text-slate-600">
                  Your smart agricultural AI account has been successfully initialized.
                </p>
              </div>
            </div>

            {/* Logout Action */}
            <div className="flex sm:flex-col items-start sm:items-end gap-2">
              <button
                id="dashboard-logout-btn"
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C1610B] border border-amber-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div
          id="dashboard-details-card"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm"
        >
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2C5F2D]">
                Farmer Profile Details
              </h2>
              <p className="text-xs text-slate-500">
                Verified registration details saved in your browser local storage.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#97BC62]/20 text-[#2C5F2D] border border-[#97BC62]/40">
              {user.farmerType}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Full Name */}
            <div id="detail-fullname" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                <User className="w-4 h-4 text-[#2C5F2D]" />
                <span>Full Name</span>
              </div>
              <p className="text-base font-bold text-slate-900">{user.fullName}</p>
            </div>

            {/* Email */}
            <div id="detail-email" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                <Mail className="w-4 h-4 text-[#2C5F2D]" />
                <span>Email Address</span>
              </div>
              <p className="text-base font-bold text-slate-900 truncate">{user.email}</p>
            </div>

            {/* Phone */}
            <div id="detail-phone" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                <Phone className="w-4 h-4 text-[#2C5F2D]" />
                <span>Phone Number</span>
              </div>
              <p className="text-base font-bold text-slate-900">{user.phoneNumber}</p>
            </div>

            {/* Farmer Type */}
            <div id="detail-type" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                <Tractor className="w-4 h-4 text-[#97BC62]" />
                <span>Farmer Category</span>
              </div>
              <p className="text-base font-bold text-[#2C5F2D]">{user.farmerType}</p>
            </div>

            {/* Registration Date */}
            <div id="detail-date" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                <Calendar className="w-4 h-4 text-[#C1610B]" />
                <span>Registered Date</span>
              </div>
              <p className="text-base font-bold text-slate-900">{user.registeredAt}</p>
            </div>

            {/* Profile ID */}
            <div id="detail-id" className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                <Sparkles className="w-4 h-4 text-[#C1610B]" />
                <span>Farmer Member ID</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-700 truncate">{user.id}</p>
            </div>
          </div>

          {/* Quick Nav to Challenges */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 text-center sm:text-left">
              Explore how AI solves field challenges like irrigation, pests, and price predictions.
            </p>
            <button
              id="dashboard-view-challenges-btn"
              onClick={onViewChallenges}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2C5F2D] hover:bg-[#204721] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Explore 8 Field Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tailored AI Modules for this Farmer */}
        <div id="tailored-recommendations" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#97BC62]" />
            <h3 className="text-lg font-bold text-[#2C5F2D]">
              Recommended AI Solutions for {user.farmerType}s
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
              <div className="w-8 h-8 rounded-lg bg-[#2C5F2D] text-white flex items-center justify-center mb-2">
                <Droplets className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#2C5F2D] mb-1">Smart Irrigation Alert</h4>
              <p className="text-xs text-slate-600">
                Automated ML soil moisture schedule to prevent over-watering.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
              <div className="w-8 h-8 rounded-lg bg-[#97BC62] text-white flex items-center justify-center mb-2">
                <ScanEye className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#2C5F2D] mb-1">Leaf Disease Scanner</h4>
              <p className="text-xs text-slate-600">
                Snap photos with your phone to diagnose early leaf blight or mildew.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
              <div className="w-8 h-8 rounded-lg bg-[#C1610B] text-white flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#2C5F2D] mb-1">Mandi Price Forecasting</h4>
              <p className="text-xs text-slate-600">
                Predictive price trends to time sales for maximum crop profit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

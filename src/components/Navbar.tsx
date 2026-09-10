import { Sprout, User, LogIn, LogOut, LayoutGrid } from 'lucide-react';
import { FarmerUser } from '../types.ts';

interface NavbarProps {
  currentTab: 'challenges' | 'auth' | 'dashboard';
  user: FarmerUser | null;
  onNavigate: (tab: 'challenges' | 'auth' | 'dashboard') => void;
  onLogout: () => void;
}

export function Navbar({ currentTab, user, onNavigate, onLogout }: NavbarProps) {
  return (
    <header id="main-navigation" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          id="navbar-brand-btn"
          onClick={() => onNavigate('challenges')}
          className="flex items-center gap-2.5 text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-[#2C5F2D] text-white flex items-center justify-center shadow-xs">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-[#2C5F2D] text-base leading-none block">
              Farmer&apos;s Field Challenges
            </span>
            <span className="text-[11px] text-[#97BC62] font-semibold tracking-wide uppercase">
              AI Agricultural Intelligence
            </span>
          </div>
        </button>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Field Challenges link */}
          <button
            id="nav-challenges-tab-btn"
            onClick={() => onNavigate('challenges')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'challenges'
                ? 'bg-[#2C5F2D]/10 text-[#2C5F2D] font-bold'
                : 'text-slate-600 hover:text-[#2C5F2D] hover:bg-slate-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Challenges</span>
          </button>

          {/* User Status / Login Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                id="nav-user-dashboard-btn"
                onClick={() => onNavigate('dashboard')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === 'dashboard'
                    ? 'bg-[#2C5F2D] text-white shadow-xs'
                    : 'bg-emerald-50 text-[#2C5F2D] border border-emerald-200/80 hover:bg-emerald-100'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[110px] truncate">{user.fullName.split(' ')[0]}</span>
              </button>

              <button
                id="nav-logout-btn"
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 rounded-xl text-slate-500 hover:text-[#C1610B] hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="nav-login-btn"
              onClick={() => onNavigate('auth')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'auth'
                  ? 'bg-[#2C5F2D] text-white shadow-xs'
                  : 'bg-[#2C5F2D] hover:bg-[#204721] text-white shadow-xs'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / Sign Up</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

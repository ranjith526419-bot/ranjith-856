import { Sprout, User, GraduationCap, Hash, ArrowRight, ShieldCheck } from 'lucide-react';
import { FarmerUser } from '../types.ts';

interface HeroProps {
  onNavigateToAuth?: () => void;
  user?: FarmerUser | null;
}

export function Hero({ onNavigateToAuth, user }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden pt-12 pb-14 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 border-b border-slate-200/60">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#97BC62]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-[#2C5F2D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Agri-Tech Badge */}
        <div className="flex justify-center mb-6">
          <div id="agri-tech-badge" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C5F2D]/10 border border-[#2C5F2D]/20 text-[#2C5F2D] text-xs font-semibold tracking-wide">
            <Sprout className="w-3.5 h-3.5 text-[#2C5F2D]" />
            <span>Agri-Tech &amp; Artificial Intelligence</span>
            <span className="w-1 h-1 rounded-full bg-[#C1610B]" />
            <span className="text-[#C1610B] font-bold">Smart Farming</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C5F2D] tracking-tight leading-tight mb-4">
            Farmer&apos;s Field Challenges
          </h1>
          <p id="hero-subtitle" className="text-xl sm:text-2xl text-slate-700 font-medium tracking-tight mb-8">
            Key problems farmers face — <span className="text-[#C1610B] font-semibold">solved by AI</span>
          </p>

          {/* Small details line requested: Name: Ranjith, Class: B.Tech IT - B, Reg No: 25108090 */}
          <div id="student-details-badge" className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-5 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-xs sm:text-sm text-slate-700 mb-6">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-[#2C5F2D]" />
              <span className="text-slate-500">Name:</span>
              <span id="student-name" className="font-bold text-[#2C5F2D]">Ranjith</span>
            </div>

            <span className="hidden sm:inline text-slate-300">|</span>

            <div className="flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-4 h-4 text-[#97BC62]" />
              <span className="text-slate-500">Class:</span>
              <span id="student-class" className="font-semibold text-slate-800">B.Tech IT - B</span>
            </div>

            <span className="hidden sm:inline text-slate-300">|</span>

            <div className="flex items-center gap-1.5 font-medium">
              <Hash className="w-4 h-4 text-[#C1610B]" />
              <span className="text-slate-500">Reg No:</span>
              <span id="student-regno" className="font-mono font-bold text-[#C1610B]">25108090</span>
            </div>
          </div>

          {/* Portal CTA */}
          {onNavigateToAuth && (
            <div className="flex justify-center">
              <button
                id="hero-portal-cta-btn"
                onClick={onNavigateToAuth}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2C5F2D] hover:bg-[#204721] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                {user ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#97BC62]" />
                    <span>View Farmer Dashboard ({user.fullName.split(' ')[0]})</span>
                  </>
                ) : (
                  <>
                    <span>Open Farmer Portal (Login / Sign Up)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Quick Highlights Bar */}
        <div id="highlights-bar" className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div id="stat-challenges" className="p-3.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-[#2C5F2D]">8</div>
            <div className="text-xs text-slate-600 font-medium">Core Field Challenges</div>
          </div>
          <div id="stat-solutions" className="p-3.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-[#97BC62]">100%</div>
            <div className="text-xs text-slate-600 font-medium">AI-Powered Solutions</div>
          </div>
          <div id="stat-tech" className="p-3.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-[#C1610B]">IoT + ML</div>
            <div className="text-xs text-slate-600 font-medium">Sensors &amp; Leaf Scans</div>
          </div>
          <div id="stat-predictive" className="p-3.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-xs text-center">
            <div className="text-2xl font-extrabold text-[#2C5F2D]">Predictive</div>
            <div className="text-xs text-slate-600 font-medium">Weather &amp; Market Trends</div>
          </div>
        </div>
      </div>
    </section>
  );
}

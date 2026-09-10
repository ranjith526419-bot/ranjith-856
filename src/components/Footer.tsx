import { Sprout, User, GraduationCap, Hash, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer id="app-footer" className="bg-white border-t border-slate-200 mt-16 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div id="footer-brand" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C5F2D] text-white flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#2C5F2D] text-lg">
                Farmer&apos;s Field Challenges — Solved by AI
              </h4>
              <p className="text-xs text-slate-500">
                Empowering modern agriculture through computer vision, predictive ML, and IoT
              </p>
            </div>
          </div>

          {/* Academic Details Reprise */}
          <div id="footer-student-credits" className="flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="flex items-center gap-1 font-medium">
              <User className="w-3.5 h-3.5 text-[#2C5F2D]" />
              <strong>Ranjith</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-[#97BC62]" />
              B.Tech IT - B
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 font-medium text-[#C1610B]">
              <Hash className="w-3.5 h-3.5" />
              25108090
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p id="copyright-text">
            © {new Date().getFullYear()} Farmer&apos;s Field Challenges. Clean Agri-Tech Presentation.
          </p>
          <p id="theme-indicator" className="flex items-center gap-1">
            Built with Forest Green <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2C5F2D]" /> &amp; Moss Green <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#97BC62]" />
          </p>
        </div>
      </div>
    </footer>
  );
}

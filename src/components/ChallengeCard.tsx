import { ChallengeItem } from '../types.ts';
import { ChallengeIcon } from './ChallengeIcon.tsx';
import { AlertCircle, Sparkles, ChevronRight } from 'lucide-react';

interface ChallengeCardProps {
  challenge: ChallengeItem;
  onClick: (challenge: ChallengeItem) => void;
}

export function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(challenge);
    }
  };

  return (
    <div
      id={`card-${challenge.id}`}
      role="button"
      tabIndex={0}
      onClick={() => onClick(challenge)}
      onKeyDown={handleKeyDown}
      className="group flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(44,95,45,0.06)] hover:shadow-[0_16px_32px_-6px_rgba(44,95,45,0.16)] hover:border-[#97BC62] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#2C5F2D] focus:ring-offset-2"
    >
      {/* Top subtle decorative accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2C5F2D] via-[#97BC62] to-[#C1610B] opacity-80" />

      <div>
        {/* Header: Icon + Number Tag */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#97BC62]/20 border border-[#97BC62]/40 text-[#2C5F2D] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#2C5F2D] group-hover:text-white">
              <ChallengeIcon name={challenge.iconName} className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {challenge.tag}
            </span>
          </div>
          <span className="text-sm font-bold text-[#97BC62]">
            #{String(challenge.number).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#2C5F2D] tracking-tight mb-4 group-hover:text-[#204721] transition-colors">
          {challenge.title}
        </h3>

        {/* Problem Section */}
        <div className="mb-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C1610B] mb-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Problem</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-medium line-clamp-2">
            {challenge.problem}
          </p>
        </div>

        {/* AI Solution Section */}
        <div className="p-3.5 rounded-xl bg-[#97BC62]/10 border border-[#97BC62]/40">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2C5F2D] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#97BC62]" />
            <span>AI Solution</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-medium line-clamp-2">
            {challenge.aiSolution}
          </p>
        </div>
      </div>

      {/* Card Footer: Click affordance */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2C5F2D] group-hover:text-[#C1610B] transition-colors">
        <span>View Full Problem &amp; Solution</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

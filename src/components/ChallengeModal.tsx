import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChallengeItem } from '../types.ts';
import { ChallengeIcon } from './ChallengeIcon.tsx';
import { ChallengeActionMock } from './ChallengeActionMock.tsx';
import { X, AlertCircle, Sparkles, CheckCircle, ArrowLeft } from 'lucide-react';

interface ChallengeModalProps {
  challenge: ChallengeItem | null;
  onClose: () => void;
}

export function ChallengeModal({ challenge, onClose }: ChallengeModalProps) {
  // Close on Escape key press & prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (challenge) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [challenge, onClose]);

  return (
    <AnimatePresence>
      {challenge && (
        <div
          id="challenge-modal-wrapper"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
        >
          {/* Semi-transparent dark overlay */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container: Bottom sheet on mobile, Centered card on sm+ */}
          <motion.div
            id={`modal-${challenge.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-challenge-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/90 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Top decorative accent bar */}
            <div className="h-2 bg-gradient-to-r from-[#2C5F2D] via-[#97BC62] to-[#C1610B] shrink-0" />

            {/* Mobile drag handle */}
            <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

            {/* Header: Icon, Category, Title, and Close button */}
            <div className="p-6 sm:p-8 pb-4 sm:pb-5 border-b border-slate-100 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#97BC62]/20 border border-[#97BC62]/40 text-[#2C5F2D] flex items-center justify-center shadow-xs shrink-0">
                    <ChallengeIcon name={challenge.iconName} className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#97BC62]">
                        Challenge #{String(challenge.number).padStart(2, '0')}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {challenge.tag}
                      </span>
                    </div>
                    <h2
                      id="modal-challenge-title"
                      className="text-2xl sm:text-3xl font-extrabold text-[#2C5F2D] tracking-tight"
                    >
                      {challenge.title}
                    </h2>
                  </div>
                </div>

                {/* Close 'X' Button */}
                <button
                  id="modal-close-icon-btn"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              {/* Problem Section */}
              <div
                id="modal-problem-section"
                className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C1610B] mb-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-[#C1610B]" />
                  </div>
                  <span className="text-sm font-extrabold text-[#C1610B]">The Problem</span>
                </div>

                <ul className="space-y-2.5 pl-1">
                  {challenge.problemPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#C1610B] mt-2 shrink-0" />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Solution Section */}
              <div
                id="modal-solution-section"
                className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C5F2D] mb-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#2C5F2D]" />
                  </div>
                  <span className="text-sm font-extrabold text-[#2C5F2D]">The AI Solution</span>
                </div>

                <ul className="space-y-2.5 pl-1">
                  {challenge.solutionPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#2C5F2D] mt-1 shrink-0" />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* See AI in Action Visual Section */}
              <ChallengeActionMock challengeId={challenge.id} />
            </div>

            {/* Modal Footer: Action buttons */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 hidden sm:inline">
                Click anywhere outside or press Esc to return
              </span>
              <button
                id="modal-close-button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2C5F2D] hover:bg-[#204721] text-white font-bold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Grid</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

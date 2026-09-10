import { useState, useEffect } from 'react';
import { CHALLENGES } from './data/challenges.ts';
import { ChallengeCard } from './components/ChallengeCard.tsx';
import { ChallengeModal } from './components/ChallengeModal.tsx';
import { Hero } from './components/Hero.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthCard } from './components/AuthCard.tsx';
import { FarmerDashboard } from './components/FarmerDashboard.tsx';
import { FarmerUser, ChallengeItem } from './types.ts';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'challenges' | 'auth' | 'dashboard'>('challenges');
  const [currentUser, setCurrentUser] = useState<FarmerUser | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Load current user from local storage on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('current_farmer');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.fullName && parsed.email) {
          setCurrentUser(parsed);
        }
      }
    } catch {
      // Ignore parse error
    }
  }, []);

  const handleAuthSuccess = (user: FarmerUser) => {
    setCurrentUser(user);
    setCurrentTab('dashboard'); // Redirect to dashboard on login or signup
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('current_farmer');
    } catch {
      // Ignore
    }
    setCurrentUser(null);
    setCurrentTab('auth'); // Returns to login page as specified in prompt
  };

  const allTags = ['all', ...Array.from(new Set(CHALLENGES.map((c) => c.tag)))];

  const filteredChallenges = CHALLENGES.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aiSolution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === 'all' || item.tag === selectedTag;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#97BC62]/30 selection:text-[#2C5F2D]">
      <Navbar
        currentTab={currentTab}
        user={currentUser}
        onNavigate={(tab) => setCurrentTab(tab)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* VIEW 1: AUTHENTICATION (Login / Sign Up) */}
        {currentTab === 'auth' && (
          <AuthCard
            onAuthSuccess={handleAuthSuccess}
            onNavigateHome={() => setCurrentTab('challenges')}
          />
        )}

        {/* VIEW 2: WELCOME DASHBOARD */}
        {currentTab === 'dashboard' && (
          currentUser ? (
            <FarmerDashboard
              user={currentUser}
              onLogout={handleLogout}
              onViewChallenges={() => setCurrentTab('challenges')}
            />
          ) : (
            <AuthCard
              onAuthSuccess={handleAuthSuccess}
              onNavigateHome={() => setCurrentTab('challenges')}
            />
          )
        )}

        {/* VIEW 3: FIELD CHALLENGES SHOWCASE */}
        {currentTab === 'challenges' && (
          <>
            {/* Hero Section with Title, Subtitle, Student Details and Portal CTA */}
            <Hero
              onNavigateToAuth={() => setCurrentTab(currentUser ? 'dashboard' : 'auth')}
              user={currentUser}
            />

            {/* Challenges Grid Section */}
            <section id="challenges-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Section Header with Search & Filter */}
              <div id="challenges-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
                <div>
                  <h2 id="challenges-heading" className="text-2xl sm:text-3xl font-bold text-[#2C5F2D] tracking-tight">
                    8 Field Challenges &amp; AI Solutions
                  </h2>
                  <p id="challenges-subtext" className="text-sm text-slate-600 mt-1">
                    Explore real-world challenges encountered by farmers and corresponding machine-learning interventions.
                  </p>
                </div>

                {/* Quick Search */}
                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="challenge-search-input"
                      type="text"
                      placeholder="Search problems, crops, AI..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl shadow-2xs focus:outline-hidden focus:border-[#2C5F2D] focus:ring-2 focus:ring-[#97BC62]/30 transition-all placeholder:text-slate-400"
                    />
                    {searchQuery && (
                      <button
                        id="clear-search-btn"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div id="category-filters" className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs scrollbar-none">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium mr-1 shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filter:</span>
                </div>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    id={`filter-tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-[#2C5F2D] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tag === 'all' ? 'All Challenges (8)' : tag}
                  </button>
                ))}
              </div>

              {/* Grid of 8 Cards */}
              {filteredChallenges.length > 0 ? (
                <div id="challenges-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onClick={(c) => setSelectedChallenge(c)}
                    />
                  ))}
                </div>
              ) : (
                <div id="empty-search-state" className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 font-medium">No challenges matching &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    id="reset-filters-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('all');
                    }}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-[#2C5F2D] text-white text-xs font-semibold hover:bg-[#234d24] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Agricultural Impact Note */}
              <div id="agricultural-impact-banner" className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#2C5F2D] to-[#1E431F] text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#97BC62] mb-2 block">
                    The AI Agricultural Transformation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                    Empowering Rural Agriculture with Smart Technology
                  </h3>
                  <p className="text-sm text-emerald-100/90 leading-relaxed">
                    By integrating Internet of Things (IoT) sensors, deep learning, computer vision, and predictive analytics,
                    farmers transition from reactive guesswork to proactive precision management — conserving water, minimizing
                    crop damage, optimizing soil nutrition, and maximizing harvest profitability.
                  </p>
                </div>
                {/* Soft decorative background leaf glow */}
                <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-[#97BC62]/20 blur-2xl pointer-events-none" />
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {/* Challenge Detail Modal */}
      <ChallengeModal
        challenge={selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
    </div>
  );
}

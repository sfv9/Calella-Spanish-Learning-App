import { useState } from "react";
import { REGIONAL_CONTENT, RegionalContent } from "../data/regionalContent";
import { getTodayScenario } from "../data/dailyScenarios";

interface UnlockableContentViewProps {
  currentDayNumber?: number;
  profileName?: string;
}

export function UnlockableContentView({
  currentDayNumber = 30, // Default: unlock all content so it's explorable from day 1
  profileName = "Learner"
}: UnlockableContentViewProps) {
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

  // Get unlocked content for today
  const unlockedContent = REGIONAL_CONTENT.filter(
    (c) => !c.unlockedAfterScenario || c.unlockedAfterScenario <= currentDayNumber
  );

  const selectedContent = selectedContentId
    ? REGIONAL_CONTENT.find((c) => c.id === selectedContentId)
    : null;

  // Use calendar day of month for the daily theme rotation (fresh each day regardless of progress)
  const calendarDay = new Date().getDate();
  const todayScenario = getTodayScenario(calendarDay);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 p-6">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="font-display text-4xl font-black text-ink mb-2">
          🗺️ Unlock Spain
        </h1>
        <p className="text-ink/70 mb-4">
          Learn about Catalonia, local culture, and travel tips as you master Spanish!
        </p>

        {/* TODAY'S SCENARIO CONTEXT */}
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-[16px] p-5 mb-6">
          <p className="text-xs font-black uppercase tracking-widest opacity-90 mb-1">
            Today's Theme
          </p>
          <h2 className="font-display text-2xl font-black mb-2">
            {todayScenario.title}
          </h2>
          <p className="text-sm opacity-95">
            {todayScenario.scenario}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SIDEBAR: CONTENT LIST */}
        <div className="lg:col-span-1">
          <ContentCategorySidebar
            unlockedContent={unlockedContent}
            selectedId={selectedContentId}
            onSelect={setSelectedContentId}
          />
        </div>

        {/* MAIN: CONTENT READER */}
        <div className="lg:col-span-2">
          {selectedContent ? (
            <ContentReader content={selectedContent} />
          ) : (
            <EmptyStatePrompt
              unlockedCount={unlockedContent.length}
              profileName={profileName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ===== SIDEBAR COMPONENT =====

interface ContentCategorySidebarProps {
  unlockedContent: RegionalContent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function ContentCategorySidebar({
  unlockedContent,
  selectedId,
  onSelect
}: ContentCategorySidebarProps) {
  const categories = ["history", "travel", "survival", "culture"] as const;
  const categoryEmojis: Record<string, string> = {
    history: "📜",
    travel: "✈️",
    survival: "🗺️",
    culture: "🎭"
  };
  const categoryTitles: Record<string, string> = {
    history: "History & Heritage",
    travel: "Travel Guides",
    survival: "Survival Guides",
    culture: "Cultural Deep Dives"
  };

  return (
    <div className="bg-white rounded-[16px] border-2 border-slate-200 p-5 h-fit sticky top-6">
      <h3 className="font-display text-lg font-black text-ink mb-4">
        📚 Available Content
      </h3>

      <div className="space-y-4">
        {categories.map((category) => {
          const contentInCategory = unlockedContent.filter(
            (c) => c.category === category
          );

          return (
            <div key={category}>
              <p className="text-xs font-black uppercase text-ink/60 mb-2">
                {categoryEmojis[category]} {categoryTitles[category]}
              </p>
              <div className="space-y-2">
                {contentInCategory.length === 0 ? (
                  <p className="text-xs text-ink/50 italic">
                    Complete more lessons to unlock
                  </p>
                ) : (
                  contentInCategory.map((content) => (
                    <button
                      key={content.id}
                      onClick={() => onSelect(content.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all text-sm font-semibold ${
                        selectedId === content.id
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-gray-100 text-ink hover:bg-gray-200"
                      }`}
                    >
                      {content.title}
                    </button>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PROGRESS */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-xs font-black text-ink/60 mb-2">YOUR PROGRESS</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{unlockedContent.length} pieces unlocked</span>
          <span className="text-xs text-ink/60">
            {Math.round((unlockedContent.length / REGIONAL_CONTENT.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all"
            style={{
              width: `${(unlockedContent.length / REGIONAL_CONTENT.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ===== CONTENT READER COMPONENT =====

interface ContentReaderProps {
  content: RegionalContent;
}

function ContentReader({ content }: ContentReaderProps) {
  const categoryEmoji: Record<string, string> = {
    history: "📜",
    travel: "✈️",
    survival: "🗺️",
    culture: "🎭"
  };

  const categoryColor: Record<string, string> = {
    history: "from-amber-100 to-orange-100 border-amber-200",
    travel: "from-green-100 to-emerald-100 border-green-200",
    survival: "from-cyan-100 to-blue-100 border-cyan-200",
    culture: "from-purple-100 to-pink-100 border-purple-200"
  };

  return (
    <div className={`bg-gradient-to-br ${categoryColor[content.category]} border-2 rounded-[16px] p-8 min-h-[600px]`}>
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-black uppercase text-ink/60 mb-2">
          {categoryEmoji[content.category]} {content.category}
        </p>
        <h1 className="font-display text-4xl font-black text-ink mb-4">
          {content.title}
        </h1>
      </div>

      {/* SECTIONS */}
      <div className="space-y-6">
        {content.sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-sm rounded-[12px] p-6 border border-white/80 shadow-sm"
          >
            <h2 className="font-display text-xl font-black text-ink mb-3">
              {section.heading}
            </h2>
            <p className="text-sm leading-relaxed text-ink/85 whitespace-pre-wrap">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-8 pt-6 border-t-2 border-white/50">
        <p className="text-xs text-ink/60 italic">
          💡 Tip: This content will help you understand the local culture and navigate real-world situations when you visit!
        </p>
      </div>
    </div>
  );
}

// ===== EMPTY STATE =====

interface EmptyStatePromptProps {
  unlockedCount: number;
  profileName: string;
}

function EmptyStatePrompt({ unlockedCount, profileName }: EmptyStatePromptProps) {
  return (
    <div className="bg-white rounded-[16px] border-2 border-slate-300 p-12 text-center min-h-[600px] flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">🗺️</div>
      <h2 className="font-display text-2xl font-black text-ink mb-2">
        Explore Spain's Culture
      </h2>
      <p className="text-ink/70 mb-6 max-w-sm">
        Select a content piece from the sidebar to learn about Catalonia, travel tips, local customs, and cultural insights!
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          ✨ You've unlocked {unlockedCount} pieces of content
        </p>
        <p className="text-xs text-blue-800">
          Complete more lessons and achieve higher accuracy to unlock even more!
        </p>
      </div>
    </div>
  );
}

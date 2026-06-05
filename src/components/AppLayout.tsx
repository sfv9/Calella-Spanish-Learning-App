import { useState } from "react";
import { ChildProfile, StoredAppState } from "../types";

/**
 * AppLayout Component
 *
 * Manages navigation between:
 * - Game (currently active view in App.tsx)
 * - Leaderboard (competition stats)
 * - Content (unlockable regional content)
 * - Settings (coming soon)
 */

export type AppView = "game" | "leaderboard" | "content" | "settings";

interface AppLayoutProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  currentChild: ChildProfile;
  appState: StoredAppState;
  gameContent: React.ReactNode; // The actual game/map rendered in App.tsx
}

export function AppLayout({
  currentView,
  onViewChange,
  currentChild,
  appState,
  gameContent
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-100">
      {/* NAVIGATION BAR */}
      <NavBar currentView={currentView} onViewChange={onViewChange} currentChild={currentChild} />

      {/* MAIN CONTENT */}
      <div className="pb-24">
        {currentView === "game" && gameContent}
        {currentView === "leaderboard" && (
          <div className="p-6">
            <p className="text-center text-gray-600">Leaderboard view (import LeaderboardView here)</p>
          </div>
        )}
        {currentView === "content" && (
          <div className="p-6">
            <p className="text-center text-gray-600">Content view (import UnlockableContentView here)</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== NAVIGATION BAR =====

interface NavBarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  currentChild: ChildProfile;
}

function NavBar({ currentView, onViewChange, currentChild }: NavBarProps) {
  const tabs: Array<{ id: AppView; label: string; emoji: string }> = [
    { id: "game", label: "Play", emoji: "🎮" },
    { id: "leaderboard", label: "Rankings", emoji: "🏆" },
    { id: "content", label: "Explore", emoji: "🗺️" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 shadow-xl z-40">
      <div className="flex items-center justify-around max-w-4xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`flex-1 py-4 px-3 flex flex-col items-center gap-1 font-bold text-xs sm:text-sm transition-all ${
              currentView === tab.id
                ? "text-blue-600 border-t-4 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* QUICK STATS */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm hidden sm:flex items-center justify-between">
        <span>{currentChild.name}'s Progress</span>
        <div className="flex gap-4">
          <span>⭐ {currentChild.totalPoints} pts</span>
          <span>📚 {currentChild.wordsMastered.length} mastered</span>
          <span>🎯 {currentChild.accuracyPercentage}% accuracy</span>
        </div>
      </div>
    </div>
  );
}

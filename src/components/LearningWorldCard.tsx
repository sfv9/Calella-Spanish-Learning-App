import {
  CheckCircle2,
  BookOpen,
  Heart,
  LockKeyhole,
  Mountain,
  Palette,
  PawPrint,
  Sparkles,
  SunMedium,
  Trees,
  Users,
  UtensilsCrossed
} from "lucide-react";
import { WorldDefinition } from "../types";

const iconMap = {
  book: BookOpen,
  heart: Heart,
  mountain: Mountain,
  palette: Palette,
  paw: PawPrint,
  sparkles: Sparkles,
  sun: SunMedium,
  trees: Trees,
  users: Users,
  utensils: UtensilsCrossed
};

interface LearningWorldCardProps {
  world: WorldDefinition;
  unlocked: boolean;
  selected: boolean;
  masteredCount: number;
  totalTerms: number;
  order: number;
  onSelect: () => void;
}

export function LearningWorldCard({
  world,
  unlocked,
  selected,
  masteredCount,
  totalTerms,
  order,
  onSelect
}: LearningWorldCardProps) {
  const Icon = iconMap[world.iconKey as keyof typeof iconMap] ?? Sparkles;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[26px] border-[2px] p-5 text-left transition duration-200 ${
        selected
          ? "border-[#ffb36c] bg-white shadow-[0_18px_34px_rgba(17,61,87,0.16)] ring-4 ring-[#ffd7a8]/70"
          : "border-white/75 bg-white/92 shadow-[0_14px_28px_rgba(17,61,87,0.10)] hover:-translate-y-1 hover:border-[#d7e6ef]"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-r ${world.colorClass} opacity-95`} />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/92 text-[#17304a] shadow-md">
              <Icon className="h-6 w-6" />
            </div>
            <div className="rounded-full bg-[#17304a] px-3 py-1 text-sm font-black text-white shadow-md">
              {order < 10 ? `0${order}` : order}
            </div>
          </div>
          <div
            className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${
              unlocked ? "bg-[#ebfff2] text-[#2d8b51]" : "bg-[#17304a]/88 text-white"
            }`}
          >
            {unlocked ? "Open" : "Locked"}
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#17304a]/55">
            Level {order}
          </p>
          <p className="mt-2 font-display text-[1.75rem] font-black leading-[1.05] text-[#17304a]">
            {world.title}
          </p>
          <p className="mt-3 text-sm font-medium leading-6 text-[#5f6e79]">
            {world.description}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-[18px] bg-[#f6f7f3] p-4 text-[#17304a]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#70818c]">Progress</p>
            <p className="mt-1 text-lg font-black">
              {unlocked ? `${masteredCount}/${totalTerms}` : "--"}
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#70818c]">
              {unlocked ? "Status" : "Unlock"}
            </p>
            <p className="mt-1 text-lg font-black">
              {unlocked ? "Ready" : `${world.unlockPoints} pts`}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm font-bold text-[#5f6e79]">
          <span className="flex items-center gap-2">
            {unlocked ? (
              <CheckCircle2 className="h-4 w-4 text-[#2d8b51]" />
            ) : (
              <LockKeyhole className="h-4 w-4 text-[#17304a]/70" />
            )}
            {unlocked ? "Tap to play this level" : "Keep earning points to unlock"}
          </span>
          <span className={`rounded-full px-3 py-1 ${world.accentClass}`}>
            {totalTerms} cards
          </span>
        </div>
      </div>
    </button>
  );
}

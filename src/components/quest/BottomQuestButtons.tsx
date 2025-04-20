'use client';

import { CalendarCheck, Users, Star, BarChart2 } from 'lucide-react';

interface BottomQuestButtonsProps {
  onDailyOpen: () => void;
  onFamilyOpen: () => void;
  onSpecialOpen: () => void;
  onRankingNavigate: () => void;
}

export default function BottomQuestButtons({
  onDailyOpen,
  onFamilyOpen,
  onSpecialOpen,
  onRankingNavigate,
}: BottomQuestButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#14AE5C] py-14 z-50">
      <div className="max-w-md mx-auto px-6 flex justify-center items-end gap-x-6">
        <QuestButton icon={<CalendarCheck className="w-6 h-6" />} label="デイリー" onClick={onDailyOpen} />
        <QuestButton icon={<Users className="w-6 h-6" />} label="ファミリー" onClick={onFamilyOpen} />
        <QuestButton icon={<Star className="w-6 h-6" />} label="スペシャル" onClick={onSpecialOpen} />
        <QuestButton icon={<BarChart2 className="w-6 h-6" />} label="ランキング" onClick={onRankingNavigate} />
      </div>
    </div>
  );
}

// ✅ 共通クエストボタン
function QuestButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-white text-xs">
      <button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-white text-[#14AE5C] flex items-center justify-center shadow-md hover:opacity-80 transition"
      >
        {icon}
      </button>
      <span className="mt-1">{label}</span>
    </div>
  );
}

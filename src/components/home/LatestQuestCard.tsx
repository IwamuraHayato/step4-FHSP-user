'use client';

import { ChevronRight } from 'lucide-react';

interface Props {
  nickname: string;
  questName: string;
}

export default function LatestQuestCard({ nickname, questName }: Props) {
  return (
    <div className="card bg-white shadow-lg border border-[#562305] rounded-xl hover:shadow-lg transition relative w-full px-2 py-3 pr-8 h-16">
      <p className="text-xs text-[#] font-bold leading-snug">
        {nickname} さんがクエストを達成しました！
      </p>

      {/* 矢印 */}
      <div className="absolute top-2 right-2">
        <ChevronRight className="w-4 h-4 text-[#D4C8BB]" />
      </div>
    </div>
  );
}

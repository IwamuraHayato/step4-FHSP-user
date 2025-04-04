'use client';

import { ChevronRight } from 'lucide-react';

interface Props {
  nickname: string;
  questName: string;
}

export default function LatestQuestCard({ nickname, questName }: Props) {
  return (
    <div className="card bg-white shadow-lg border border-[#562305] rounded-xl hover:shadow-lg transition relative w-full px-4 py-3 pr-10">
      <p className="text-xs text-[#] font-bold leading-snug">
        {nickname} さんが <span className="text-[#EB3223]">「{questName}」</span> を達成しました！
      </p>

      {/* 矢印 */}
      <div className="absolute top-2 right-2">
        <ChevronRight className="w-4 h-4 text-[#D4C8BB]" />
      </div>
    </div>
  );
}

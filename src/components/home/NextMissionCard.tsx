'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  destination: string;
  remainingSteps: number;
}

export default function NextMissionCard({ destination, remainingSteps }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/quest'); // クエストページに遷移
  };

  return (
    <div
      onClick={handleClick}
      className="card bg-white shadow-lg border border-[#562305] p-3 rounded-xl hover:shadow-lg transition relative w-full h-16 cursor-pointer"
    >
      {/* 右上の矢印 */}
      <div className="absolute top-2 right-2">
        <ChevronRight className="w-4 h-4 text-[#D4C8BB]" />
      </div>

      <div className="space-y-2">
        {/* ミッション情報 */}
        <p className="text-xs text-[#562305] font-bold leading-snug">
          あと
          <span className="text-sm font-bold mx-1 text-[#EB3223]">
            {remainingSteps.toLocaleString()}
          </span>
          歩
        </p>

        {/* プログレスバー */}
        <div className="w-full h-2 bg-[#F0EDE3] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFF34A] to-[#FFA54A] transition-all"
            style={{
              width: `${Math.min((10000 - remainingSteps) / 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

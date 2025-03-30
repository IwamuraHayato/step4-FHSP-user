'use client';

import { useEffect, useState } from 'react';
import HomeHeader from '@/components/common/HomeHeader';
import HappySmilePointCarousel from '@/components/home/PointCarousel';
import NextMissionCard from '@/components/home/NextMissionCard';
import LatestQuestCard from '@/components/home/LatestQuestCard';

export default function HomePage() {
  const [points, setPoints] = useState<null | {
    saibuPoint: number;
    nimocaPoint: number;
    happySmilePoint: number;
    total: number;
    familyPoints: Record<string, number>;
  }>(null);

  // 一時的なモックデータ（後でAPIに置き換え）
  useEffect(() => {
    const mockData = {
      saibuPoint: 150,
      nimocaPoint: 300,
      happySmilePoint: 1300,
      total: 1750,
      familyPoints: {
        はせ: 400,
        いわむ: 300,
        もりぃ: 300,
        えご: 200,
        りじちょー: 100,
      },
    };
    setPoints(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EDE3]">
      <HomeHeader />

      <main className="px-4 pt-2 space-y-6 max-w-md mx-auto">
        {/* ポイントカルーセル */}
        {points ? (
          <HappySmilePointCarousel points={points} />
        ) : (
          <div className="text-center text-[#9F8372]">ポイントを取得中...</div>
        )}

        {/* 🟨 ミッション & クエストカード */}
        <div className="grid grid-cols-2 gap-4">
          <NextMissionCard destination="宗像市" remainingSteps={5000} />
          <LatestQuestCard nickname="もりぃ" questName="公園でみんなで遊ぼう" />
        </div>

        {/* 今後のセクション */}
        <div className="text-sm text-center text-[#9F8372] mt-10">
          この付近にクエストやイベントカードが表示されます。
        </div>
      </main>
    </div>
  );
}

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
        
        <div className="relative bg-[#FFA54A] py-3 px-4 mt-6 text-white font-bold text-center text-lg">
          {/* 左上のツリー */}
          <img
            src="/images/tree.png"
            alt="tree left"
            className="absolute top-0 left-2 w-8 h-8 -translate-y-1/2"
          />
          {/* 右上のツリー */}
          <img
            src="/images/tree.png"
            alt="tree right"
            className="absolute top-0 right-2 w-8 h-8 -translate-y-1/2"
          />

          EVENT・CAMPAIGN
        </div>

        {/* 今後のセクション */}
        <div className="text-sm text-center text-[#9F8372] mt-10">
          この付近にクエストやイベントカードが表示されます。
        </div>
      </main>
    </div>
  );
}

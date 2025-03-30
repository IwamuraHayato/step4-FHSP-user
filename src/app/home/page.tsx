'use client';

import { useEffect, useState } from 'react';
import HomeHeader from '@/components/common/HomeHeader';
import HappySmilePointCarousel from '@/components/home/PointCarousel';

export default function HomePage() {
  const [points, setPoints] = useState<null | {
    saibuPoint: number; // 西部ガスポイント
    nimocaPoint: number; // Nimocaポイント
    happySmilePoint: number; // HappySmileポイント
    total: number; // 合算ポイント
    familyPoints: Record<string, number>; // 各メンバーのポイント
  }>(null);

  // 一時的なモックデータ（本番ではAPI等と接続）
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
    <div className="min-h-screen bg-[#F8F4F1]">
      <HomeHeader />

      <main className="px-4 pt-6 space-y-6 max-w-md mx-auto">
        {/* ポイントカルーセル（Happy Smile Connect） */}
        {points ? (
          <HappySmilePointCarousel points={points} />
        ) : (
          <div className="text-center text-[#9F8372]">ポイントを取得中...</div>
        )}

        {/* 今後のセクション */}
        <div className="text-sm text-center text-[#9F8372] mt-10">
          この付近にクエストやイベントカードが表示されます。
        </div>
      </main>
    </div>
  );
}

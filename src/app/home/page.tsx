'use client';

import { useEffect, useState } from 'react';
import HomeHeader from '@/components/common/HomeHeader';
import HappySmilePointCarousel from '@/components/home/PointCarousel';
import NextMissionCard from '@/components/home/NextMissionCard';
import LatestQuestCard from '@/components/home/LatestQuestCard';
import EventCard from '@/components/home/EventCard';

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

  const mockEvents = [
    {
      id: 'e1',
      imageUrl: '/images/event1.jpg',
      area: '福岡市東区',
      title: '福マルシェ @アイランドシティ',
      date: '2025/04/13',
      tags: ['地域活性化', 'グルメ', 'のんびり派'],
      points: 100,
    },
    {
      id: 'e2',
      imageUrl: '/images/event2.jpg',
      area: '福岡市中央区',
      title: '福岡城さくらまつり',
      date: '2025/04/01',
      tags: ['お祭り', 'のんびり派', 'エンタメ'],
    },
    {
      id: 'e3',
      imageUrl: '/images/event3.jpg',
      area: '福岡市西区',
      title: '謎解きスタンプラリー',
      date: '2025/04/20',
      tags: ['ウォーキング', 'アクティブ', '地域イベント'],
    },
    {
      id: 'e4',
      imageUrl: '/images/event4.jpg',
      area: '古賀市',
      title: '春のいちご狩りイベント',
      date: '2025/04/10',
      tags: ['スイーツ', '学び・体験', 'アクティブ'],
    },
    {
      id: 'e5',
      imageUrl: '/images/event5.jpg',
      area: '飯塚市',
      title: 'CHIKUHOU酒まつり',
      date: '2025/03/29',
      tags: ['グルメ', '地域イベント', 'お祭り'],
    },
    {
      id: 'e6',
      imageUrl: '/images/event6.jpg',
      area: '久留米市',
      title: '久留米花まつり',
      date: '2025/04/15',
      tags: ['文化・歴史', '地域イベント', 'お祭り'],
      points: 50,
    },
  ];
  

  return (
    <div className="min-h-screen bg-[#F0EDE3] ">
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

        {/* 上に余白 */}
        <div className="h-4" />

        <div className="relative bg-[#FFA54A] py-4 px-4 text-white font-bold text-center text-lg">
          {/* 左上のツリー */}
          <img
            src="/images/tree.png"
            alt="tree left"
            className="absolute top-0 left-2 w-12 h-12 -translate-y-1/2"
          />
          {/* 右上のbus */}
          <img
            src="/images/nishitetsubus.png"
            alt="bus right"
            className="absolute top-0 right-2 w-13 h-11 -translate-y-1/2"
          />
          EVENT・CAMPAIGN
        </div>


        {/* イベント一覧セクション */}
        <section className="mt-6">
          <div className="grid grid-cols-2 gap-3">
            {mockEvents.slice(0, 6).map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="text-sm text-[#9F8372] underline hover:opacity-80" onClick={() => alert('検索ページへ遷移予定')}>
              もっとみる ＞
            </button>
          </div>
        </section>
        <div className="h-4" />
      </main>
    </div>
  );
}

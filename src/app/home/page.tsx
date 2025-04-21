'use client';

import { useEffect, useState } from 'react';
import HomeHeader from '@/components/common/HomeHeader';
import HappySmilePointCarousel from '@/components/home/PointCarousel';
import NextMissionCard from '@/components/home/NextMissionCard';
import LatestQuestCard from '@/components/home/LatestQuestCard';
import EventCard, { EventCardProps } from '@/components/home/EventCard';
import BottomNav from '@/components/common/BottomNav';
import FloatingButton from '@/components/common/FloatingButton';
import Link from 'next/link';
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react';
import Image from 'next/image';



export default function HomePage() {
  const [points, setPoints] = useState<null | {
    saibuPoint: number;
    nimocaPoint: number;
    happySmilePoint: number;
    total: number;
    familyPoints: Record<string, number>;
  }>(null);

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

  const user_id = 3;
  const [recommendedEvents, setRecommendedEvents] = useState<EventCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedEvent = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/recommendations/${user_id}?top_n=5`);
        const data = await res.json();

        if (Array.isArray(data.events)) {
          setRecommendedEvents(data.events);
        } else {
          setRecommendedEvents([]);  // データないときは空配列
        }
      } catch (error) {
        console.error('おすすめイベントの取得に失敗しました：',error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedEvent();
  },[user_id]);



  return (
    <div className="min-h-screen bg-[#F0EDE3] pb-32 relative">
      <HomeHeader />

      <main className="px-6 pt-1 space-y-4 max-w-md mx-auto">
        {points ? (
          <HappySmilePointCarousel points={points} />
        ) : (
          <div className="text-center text-[#9F8372]">ポイントを取得中...</div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <NextMissionCard destination="宗像市" remainingSteps={5000} />
          <LatestQuestCard nickname="もりぃ" questName="公園でみんなで遊ぼう" />
        </div>

        <div className="h-1" />

        <div className="relative bg-[#FFA54A] py-4 px-4 text-white font-bold text-center text-md">
        <Image
          src="/images/tree.png"
          alt="tree left"
          width={48} // ← Tailwindの w-12 (12 * 4 = 48px)
          height={48}
          className="absolute top-0 left-2 -translate-y-1/2"
        />
        <Image
          src="/images/nishitetsubus.png"
          alt="bus right"
          width={52} // ← w-13 は 52px 相当
          height={44} // ← h-11 は 44px 相当
          className="absolute top-0 right-2 -translate-y-1/2"
        />
          EVENT・CAMPAIGN
        </div>

        <section className="mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center text-[#9F8372]">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              おすすめイベントを取得中...
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols gap-3">
                {recommendedEvents.map((event) => (
                  <Link href={`/eventdetail/${event.event_id}`} key={event.event_id}>
                    <EventCard {...event} />
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Link href="/event">
                  <button className="text-sm text-[#9F8372] underline hover:opacity-80">
                    もっとみる ＞
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </section>


      </main>
      <BottomNav />
    </div>
  );
}

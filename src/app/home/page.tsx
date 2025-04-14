'use client';

import { useEffect, useState } from 'react';
import HomeHeader from '@/components/common/HomeHeader';
import HappySmilePointCarousel from '@/components/home/PointCarousel';
import NextMissionCard from '@/components/home/NextMissionCard';
import LatestQuestCard from '@/components/home/LatestQuestCard';
import EventCard from '@/components/home/EventCard';
import BottomNav from '@/components/common/BottomNav';
import FloatingButton from '@/components/common/FloatingButton';
import Link from 'next/link';
import { motion } from 'framer-motion'


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

      <main className="px-4 pt-2 space-y-6 max-w-md mx-auto">
        {points ? (
          <HappySmilePointCarousel points={points} />
        ) : (
          <div className="text-center text-[#9F8372]">ポイントを取得中...</div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <NextMissionCard destination="宗像市" remainingSteps={5000} />
          <LatestQuestCard nickname="もりぃ" questName="公園でみんなで遊ぼう" />
        </div>

        <div className="h-4" />

        <div className="relative bg-[#FFA54A] py-4 px-4 text-white font-bold text-center text-lg">
          <img
            src="/images/tree.png"
            alt="tree left"
            className="absolute top-0 left-2 w-12 h-12 -translate-y-1/2"
          />
          <img
            src="/images/nishitetsubus.png"
            alt="bus right"
            className="absolute top-0 right-2 w-13 h-11 -translate-y-1/2"
          />
          EVENT・CAMPAIGN
        </div>


        <section className="mt-6">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-[#9F8372]"
            >
              おすすめイベントを取得中...
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {recommendedEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
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

      <FloatingButton href="/kids-compass" className="bottom-16 right-[-12px] w-32 h-32" />
      <BottomNav />
    </div>
  );
}

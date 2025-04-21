'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CalendarDays, MapPin, Star } from 'lucide-react';
import HomeHeader from '@/components/common/HomeHeader';
import BottomNav from '@/components/common/BottomNav';
import { motion } from 'framer-motion';

type Event = {
  event_id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  area: string;
  store_name?: string;
  image_url?: string;
  flyer_url?: string;
  information?: string;
  tags: string[];
};

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${id}`);
        if (!res.ok) throw new Error('イベント取得に失敗しました');
        const data = await res.json();
        setEvent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (isLoading) return <div className="text-center p-4">読み込み中...</div>;
  if (error) return <div className="text-center text-red-500 p-4">エラー: {error}</div>;
  if (!event) return <div className="text-center p-4">イベントが見つかりませんでした</div>;

  return (
    <motion.div
      className="min-h-screen bg-[#F0EDE3] pb-24"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* ヘッダー */}
      <HomeHeader />

      {/* メインカード */}
      <div className="max-w-md mx-auto px-6 mt-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
          {/* イベント画像 */}
          <div className="relative px-6 pt-10">
          <Image
              src={
                event.image_url && event.image_url.endsWith('.pdf')
                  ? '/images/no-image.png'
                  : event.image_url || '/images/no-image.png'
              }
              alt={event.title}
              width={600}
              height={300}
              className="w-full h-[200px] object-cover"
            />

            {/* 閉じるボタン */}
            <button
              onClick={() => router.back()}
              className="absolute top-2 right-2 text-[#9F8372] bg-[#E4D9CE] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#D4C8BB] transition"
              aria-label="閉じる"
            >
              ✕
            </button>
          </div>

          {/* 内容 */}
          <div className="p-8 space-y-4 text-black">
            {/* タイトル + スター */}
            <div className="flex items-start justify-between">
              <h1 className="text-lg font-bold">{event.title}</h1>
              <Star className="w-5 h-5 text-[#FFA54A] fill-[#FFA54A]" />
            </div>

            {/* 説明文 */}
            <p className="text-sm leading-relaxed">{event.description}</p>

            {/* 日時 */}
            <div className="flex items-center gap-2 text-sm text-[#9F8372]">
              <CalendarDays className="w-4 h-4" />
              <span>
                <span className="text-[#9F8372]">{event.date}</span> {event.time}
              </span>
            </div>

            {/* 会場情報 */}
            <div className="flex items-start gap-2 text-sm text-[#9F8372]">
              <MapPin className="w-4 h-4 mt-0.5" />
              <div>
                {event.area}
              </div>
            </div>

            {/* Happy Smile Point 枠 */}
            {event.information && (
              <div className="border border-[#FF6B6B] p-3 rounded-sm">
                <h2 className="text-sm font-bold text-[#FF6B6B] mb-1">Happy Smile Point</h2>
                <p className="text-sm leading-relaxed">{event.information}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* フッター */}
      <BottomNav />
    </motion.div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { CalendarDays, MapPin, Star } from 'lucide-react';
import HomeHeader from '@/components/common/HomeHeader';
import BottomNav from '@/components/common/BottomNav';

export default function EventDetailPage() {
  const dummyEvent = {
    id: 'e1',
    title: '福マルシェ',
    description:
      '今季ラストのイチゴに採れたて牡蠣で春を満喫！アスパラや菜の花畑に、採れたて牡蠣の蒸し焼き。今季ラストの名残惜しいイチゴをお届けします。',
    date: '2024年9月29日（日）',
    time: '10:00〜14:30',
    location: '照葉積水ハウスアリーナ東側公園',
    address: '福岡県福岡市東区香椎照葉6-1-1',
    pointInfo:
      '当日、会場にてアンケートに回答してくださった方に100ptプレゼントします。受付場所は、体験用の展示のテント下です。アプリのQRコードをご準備の上ご参加ください。',
    imageUrl: '/images/event1.jpg',
  };

  return (
    <div className="min-h-screen bg-[#F0EDE3] pb-24">
      {/* ヘッダー */}
      <HomeHeader />

      {/* メインカード */}
      <div className="max-w-md mx-auto px-6 mt-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* イベント画像 */}
          <div className="relative px-6 pt-10">
            <Image
              src={dummyEvent.imageUrl}
              alt={dummyEvent.title}
              width={600}
              height={300}
              className="w-full h-[200px] object-cover"
            />
            <button
              onClick={() => history.back()}
              className="absolute top-3 right-3 text-[#9F8372] text-xl bg-[#D4C8BB] rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* 内容 */}
          <div className="p-8 space-y-4 text-black">
            {/* タイトル + スター */}
            <div className="flex items-start justify-between">
              <h1 className="text-lg font-bold">{dummyEvent.title}</h1>
              <Star className="w-5 h-5 text-[#FFA54A] fill-[#FFA54A]" />
            </div>

            {/* 説明文 */}
            <p className="text-sm leading-relaxed">{dummyEvent.description}</p>

            {/* 日時 */}
            <div className="flex items-center gap-2 text-sm text-[#9F8372]">
              <CalendarDays className="w-4 h-4" />
              <span>
                <span className="text-[#9F8372]">{dummyEvent.date}</span> {dummyEvent.time}
              </span>
            </div>

            {/* 会場情報 */}
            <div className="flex items-start gap-2 text-sm text-[#9F8372]">
              <MapPin className="w-4 h-4 mt-0.5" />
              <div>
                <div>{dummyEvent.location}</div>
                <div>{dummyEvent.address}</div>
              </div>
            </div>

            {/* Happy Smile Point 枠 */}
            <div className="border border-[#FF6B6B] p-3 rounded-sm">
              <h2 className="text-sm font-bold text-[#FF6B6B] mb-1">Happy Smile Point</h2>
              <p className="text-sm leading-relaxed">{dummyEvent.pointInfo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <BottomNav />
    </div>
  );
}

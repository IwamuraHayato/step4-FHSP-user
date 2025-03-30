'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  points: {
    saibuPoint: number; // 🚧 西部ガス連携ポイント
    nimocaPoint: number; // 🚧 Nimoca連携ポイント
    happySmilePoint: number; // 🚧 Happy Smile本体のポイント
    total: number;
    familyPoints: Record<string, number>;
  };
}

export default function PointCarousel({ points }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const familyDataArray = Object.entries(points.familyPoints)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], index) => ({
      name,
      value,
      color: ['#EB3223', '#FFBD1C', '#57C97C', '#45A3E5', '#6A67CE'][index % 5],
    }));

  return (
    <div className="w-full">
      <div className="px-4">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {/* Slide 1: MY POINT */}
          <SwiperSlide>
            <div className="card shadow-xl border border-[#562305] rounded-xl p-8 h-64 bg-white flex flex-col justify-between">
              <div className="flex flex-col items-center gap-2 leading-tight">
                <div className="text-[#EB3223] font-bold text-lg">MY POINT</div>
                <div className="text-2xl font-bold text-[#562305]">
                  {points.nimocaPoint.toLocaleString()} P
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="bg-[#F0EDE3] rounded-lg w-24 h-24 flex items-center justify-center text-sm">
                  QRコード
                </div>
                <div className="bg-[#F0EDE3] rounded-lg flex-1 ml-4 flex items-center justify-center text-sm">
                  1234567890
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2: FAMILY POINT + 円グラフ + 凡例 */}
          <SwiperSlide>
            <div className="card shadow-xl border border-[#562305] rounded-xl p-6 h-64 bg-white flex flex-col justify-start">
              <div className="text-[#EB3223] font-bold text-center text-lg mb-2">FAMILY POINT</div>
              <div className="text-[#562305] text-2xl text-center font-bold mb-4">
                {points.total.toLocaleString()} P
              </div>
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00000033" />
                        </filter>
                      </defs>
                      <Pie
                        data={familyDataArray}
                        dataKey="value"
                        innerRadius={28}
                        outerRadius={56}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                        filter="url(#shadow)"
                      >
                        {familyDataArray.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* 凡例リスト */}
                <div className="flex-1 space-y-1 overflow-y-auto max-h-28 pr-2 flex flex-col">
                  {familyDataArray.map(({ name, value, color }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between text-sm text-[#562305] w-full gap-1"
                    >
                      <div className="flex items-center gap-1 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="truncate text-left w-20">{name}</span>
                      </div>
                      <span className="text-right w-20 pr-1">{value.toLocaleString()} P</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3: Happy Smile Connect */}
          <SwiperSlide>
            <div className="card shadow-xl border border-[#562305] rounded-xl p-6 h-64 bg-white flex flex-col justify-center">
              <div className="text-[#EB3223] text-lg font-bold text-center leading-tight mb-8">
                Happy Smile Connect
              </div>
              <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-400 text-white rounded-full flex items-center justify-center shadow-2xl mb-1">
                    {points.saibuPoint}
                  </div>
                  <div className="text-xs text-[#562305]">Saibu Point</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-pink-400 text-white rounded-full flex items-center justify-center shadow-2xl mb-1">
                    {points.nimocaPoint}
                  </div>
                  <div className="text-xs text-[#562305]">Nimoca Point</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-yellow-400 text-white rounded-full flex items-center justify-center shadow-2xl mb-1">
                    {points.happySmilePoint}
                  </div>
                  <div className="text-xs text-[#562305]">HAPPY SMILE</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* インジケーター */}
      <div className="flex justify-center mt-4 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-[#562305]' : 'bg-[#D4C8BB]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

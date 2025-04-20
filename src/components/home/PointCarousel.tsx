'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  points: {
    saibuPoint: number;
    nimocaPoint: number;
    happySmilePoint: number;
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
            <div className="card shadow-xl border border-[#562305] rounded-xl p-4 h-42 bg-white flex flex-col justify-between">
              <div className="flex flex-col items-center gap-2 leading-tight">
                <div className="text-[#EB3223] font-bold text-sm">MY POINT</div>
                <div className="text-md font-bold text-[#562305]">
                  {points.nimocaPoint.toLocaleString()} P
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="bg-[#F0EDE3] rounded-lg w-20 h-20 flex items-center justify-center text-sm">
                  QRコード
                </div>
                <div className="bg-[#F0EDE3] rounded-lg flex-1 ml-4 flex items-center justify-center text-sm">
                  1234567890
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="card shadow-xl border border-[#562305] rounded-xl h-42 p-4 bg-white flex flex-col justify-start">
              <div className="text-[#EB3223] font-bold text-center text-sm mb-1">FAMILY POINT</div>
              <div className="text-[#562305] text-sm text-center font-bold mb-4">
                {points.total.toLocaleString()} P
              </div>

              {/* 内容エリアを分割：flex & shrink-0 */}
              <div className="flex flex-1 items-start gap-6 overflow-hidden">
                {/* 円グラフサイズ縮小 */}
                <div className="w-20 h-20 shrink-0 ml-10">
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
                        innerRadius={20}
                        outerRadius={40}
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

                {/* 凡例（text-xsにして max-h を制限） */}
                <div className="flex-1 space-y-0.5 overflow-y-auto max-h-[5rem] pr-1 text-xs leading-tight mr-7">
                  {familyDataArray.map(({ name, value, color }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between w-full gap-1 text-[#562305]"
                    >
                      <div className="flex items-center gap-1 min-w-0">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="truncate w-20">{name}</span>
                      </div>
                      <span className="text-right w-14">{value.toLocaleString()} P</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>



          {/* Slide 3: Happy Smile Connect */}
          <SwiperSlide>
            <div className="card shadow-xl border border-[#562305] rounded-xl p-4 h-42 bg-white flex flex-col justify-center">
              <div className="text-[#9F8372] text-sm font-bold text-center leading-tight mb-4">
                Happy Smile Connect
              </div>
              <div className="flex justify-center gap-4">
                {/* Saibu Point */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(101, 190, 255, 1)',
                      boxShadow:
                        '0 0 8px 2px rgba(101, 190, 255, 0.5), 0 0 12px 6px rgba(101, 190, 255, 0.2)',
                    }}
                  >
                    <span className="text-white font-bold">{points.saibuPoint}</span>
                  </div>
                  <div className="text-xs text-[#65BEFF] mt-2 font-bold">西部ガス</div>
                </div>

                {/* Nimoca Point */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(248, 143, 148, 1)',
                      boxShadow:
                        '0 0 8px 2px rgba(248, 143, 148, 0.5), 0 0 12px 6px rgba(248, 143, 148, 0.2)',
                    }}
                  >
                    <span className="text-white font-bold">{points.nimocaPoint}</span>
                  </div>
                  <div className="text-xs text-[#F88F94] mt-2 font-bold">nimoca</div>
                </div>

                {/* Happy Smile Point */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(255, 228, 76, 1)',
                      boxShadow:
                        '0 0 8px 2px rgba(255, 228, 76, 0.5), 0 0 12px 6px rgba(255, 228, 76, 0.2)',
                    }}
                  >
                    <span className="text-white font-bold">{points.happySmilePoint}</span>
                  </div>
                  <div className="text-xs text-[#FFE44C] mt-2 font-bold">ハピスマ</div>
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

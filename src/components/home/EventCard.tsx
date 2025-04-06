'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface EventCardProps {
  imageUrl: string;
  area: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  points?: number;
  defaultFavorite?: boolean;
}

export default function EventCard({
  imageUrl,
  area,
  title,
  date,
  tags,
  description = 'ここにイベントの説明文が入ります。これはダミーテキストです。実際の情報に置き換えてください。',
  points,
  defaultFavorite = false,
}: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(defaultFavorite);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    console.log(`${title} を ${!isFavorite ? 'お気に入り登録' : 'お気に入り解除'}しました`);
  };

  return (
    <div className="rounded-md border border-[#E4E4E4] shadow-md bg-white p-3">
      {/* イベント画像 */}
      <div className="relative w-full h-[120px] rounded overflow-hidden mb-2">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        {points && (
          <div className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {points}ポイント
          </div>
        )}
      </div>

          <div className="relative">
      {/* エリア・タイトル */}
      <div className="flex flex-col pr-6"> {/* ← 星分のスペース確保 */}
        <span className="text-xs font-semibold text-[#FFA54A] mb-1">{area}</span>
        <span className="block text-sm font-bold text-[#000] truncate whitespace-nowrap overflow-hidden">
          {title}
        </span>
      </div>

      {/* お気に入りボタン（右上に固定） */}
      <button
        onClick={toggleFavorite}
        aria-label="お気に入り"
        className="absolute top-0 right-0"
      >
        <Star
          className={`w-5 h-5 ${
            isFavorite ? 'fill-[#FFA54A] text-[#FFA54A]' : 'text-[#D4C8BB]'
          } transition-colors`}
        />
      </button>
    </div>

      {/* 日付 */}
      <div className="text-xs font text-[#000000] mt-2">{date}</div>

      {/* 概要 */}
      <p className="text-xs text-[#000000] mt-1 line-clamp-2">
        {description}
      </p>

      {/* タグ（#なし・背景色あり・2行でカット） */}
      <div className="mt-2 flex flex-wrap gap-1 max-h-[3.5rem] overflow-hidden">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-[#9F8372] bg-[#F0EDE3] rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

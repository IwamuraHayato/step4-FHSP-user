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
  points?: number;
  defaultFavorite?: boolean;
}

export default function EventCard({
  imageUrl,
  area,
  title,
  date,
  tags,
  points,
  defaultFavorite = false,
}: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(defaultFavorite);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);

    // 🚧 DBに保存したい場合はここでAPI連携
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

      {/* エリア・タイトル・★ */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-xs text-[#562305] font-bold mb-1">{area}</span>
          <span className="text-sm font-bold text-[#000]">{title}</span>
        </div>

        <button onClick={toggleFavorite} aria-label="お気に入り">
          <Star
            className={`w-5 h-5 ${
              isFavorite ? 'fill-[#FFA54A] text-[#FFA54A]' : 'text-[#D4C8BB]'
            } transition-colors`}
          />
        </button>
      </div>

      {/* 日付 */}
      <div className="text-xs text-[#562305] font-bold mt-1">{date}</div>

      {/* タグ */}
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-[#9F8372] bg-[#F0EDE3] rounded-full px-2 py-0.5"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

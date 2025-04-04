'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Star } from 'lucide-react';

interface EventCardProps {
  id: string;
  imageUrl: string;
  area: string;
  title: string;
  date: string;
  tags: string[];
  points?: number;
}

export default function EventCard({
  id,
  imageUrl,
  area,
  title,
  date,
  tags,
  points,
}: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // 🚧 実際はここでお気に入りAPIにリクエスト送信
    console.log(`イベント ${id} のお気に入り:`, !isFavorite);
  };

  return (
    <div className="relative rounded-md shadow-md overflow-hidden border border-[#E0DAD3] bg-white p-2">
      {/* イベント画像 */}
      <div className="relative h-32 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />

        {/* ポイントバッジ */}
        {points && (
          <div className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {points}ポイント
          </div>
        )}

        {/* お気に入りボタン */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 text-[#EB3223]"
        >
          <Star
            size={20}
            fill={isFavorite ? '#EB3223' : 'none'}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* イベント情報 */}
      <div className="p-3 space-y-1">
        <p className="text-xs font-bold text-[#562305]">{area}</p>
        <p className="text-sm font-bold text-[#562305] leading-tight truncate">
          {title}
        </p>
        <p className="text-sm text-[#562305] font-semibold">{date}</p>

        {/* タグ */}
        <div className="flex flex-wrap gap-1 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-[#9F8372] bg-[#F8F4F1] rounded px-2 py-[2px]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

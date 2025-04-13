'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface EventCardProps {
  id: string
  imageUrl: string;
  area: string;
  title: string;
  date: string;
  tags?: string[];
  description?: string;
  points?: number;
  defaultFavorite?: boolean;
  user_id: number;
}

export default function EventCard({
  id,
  imageUrl,
  area,
  title,
  date,
  tags = [],
  description = 'イベントの説明がまだ登録されていません。',
  points,
  defaultFavorite = false,
}: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(defaultFavorite);
  const user_id=3;

  const toggleFavorite = async () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/favorites/${user_id}/${id}`, {
      method: newState ? 'POST' : 'DELETE',
    });
  
    if (!res.ok) {
      console.error('お気に入り登録に失敗しました');
      // 失敗時は状態を戻す
      setIsFavorite(!newState);
      return;
    }
  
    console.log(`${title} を ${newState ? 'お気に入り登録' : 'お気に入り解除'}しました`);
  };

  return (
    <div className="rounded-md border border-[#E4E4E4] shadow-md bg-white p-3">
      {/* イベント画像 */}
      <div className="relative w-full h-[120px] rounded overflow-hidden mb-2">
        <Image src={imageUrl || '/images/no-image.png'} alt={title} fill className="object-cover" />
        {points && (
          <div className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {points}ポイント
          </div>
        )}
      </div>

      <div className="relative">
        {/* エリア・タイトル */}
        <div className="flex flex-col pr-6">
          <span className="text-xs font-semibold text-[#FFA54A] mb-1">{area}</span>
          <span className="block text-sm font-bold text-[#000] truncate">
            {title}
          </span>
        </div>

        {/* お気に入りボタン */}
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
      <div className="text-xs text-[#000000] mt-2">{date}</div>

      {/* 概要 */}
      <p className="text-xs text-[#000000] mt-1 line-clamp-2 min-h-[2.5em]">{description}</p>

      {/* タグ */}
      <div className="mt-2 flex flex-wrap gap-1 max-h-[3.5rem] overflow-hidden">
        {Array.isArray(tags) &&
          tags.map((tag) => (
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

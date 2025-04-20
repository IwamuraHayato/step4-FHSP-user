'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface EventCardProps {
  id: string;
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
  const [showModal, setShowModal] = useState(false);
  const user_id = 3;

  // ✅ 全角換算で20文字まで切り、超える場合は「...」を付ける
  const truncateZenkakuText = (text: string, maxLength: number) => {
    let count = 0;
    let result = '';
    for (const char of text) {
      count += /[ -~]/.test(char) ? 0.5 : 1; // 半角=0.5、全角=1
      if (count > maxLength) break;
      result += char;
    }
    return count > maxLength ? result + '…' : result;
  };

  const toggleFavorite = async () => {
    const newState = !isFavorite;
    setIsFavorite(newState);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/favorites/${user_id}/${id}`, {
      method: newState ? 'POST' : 'DELETE',
    });

    if (!res.ok) {
      console.error('お気に入り登録に失敗しました');
      setIsFavorite(!newState);
      return;
    }

    console.log(`${title} を ${newState ? 'お気に入り登録' : 'お気に入り解除'}しました`);
  };

  const displayTags = tags.slice(0, 4);
  const hasMoreTags = tags.length > 4;

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
          <span className="block text-sm font-bold text-[#000]">
            {truncateZenkakuText(title, 20)}
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
      <div className="mt-2 flex flex-wrap gap-1">
        {displayTags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-[#9F8372] bg-[#F0EDE3] rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}

        {hasMoreTags && (
          <button
            onClick={() => setShowModal(true)}
            className="text-[10px] text-[#9F8372] underline"
          >
            タグを全部見る
          </button>
        )}
      </div>

      {/* モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 max-w-sm w-full shadow-lg">
            <h2 className="text-sm font-bold mb-2">すべてのタグ</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-[#9F8372] bg-[#F0EDE3] rounded-full px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-white bg-[#9F8372] px-4 py-1 rounded-full hover:bg-[#b79c8b]"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface EventCardProps {
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
  const router = useRouter();
  const user_id = 3;

  const truncateZenkakuText = (text: string, maxLength: number) => {
    let count = 0;
    let result = '';
    for (const char of text) {
      count += /[ -~]/.test(char) ? 0.5 : 1;
      if (count > maxLength) break;
      result += char;
    }
    return count > maxLength ? result + '…' : result;
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // ← カード遷移を防ぐ
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

  const handleCardClick = () => {
    router.push(`/event/${id}`);
  };

  const displayTags = tags.slice(0, 4);
  const hasMoreTags = tags.length > 4;

  return (
    <div
      onClick={handleCardClick}
      className="flex border border-[#E4E4E4] shadow-md bg-white rounded-md p-3 gap-3 min-h-[120px] hover:bg-[#F9F6F2] transition-colors cursor-pointer"
    >
      {/* イベント画像 */}
      <div className="relative w-28 h-28 flex-shrink-0 rounded overflow-hidden">
        <Image src={imageUrl || '/images/no-image.png'} alt={title} fill className="object-cover" />
        {points && (
          <div className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {points}ポイント
          </div>
        )}
      </div>

      {/* 右側の情報 */}
      <div className="flex flex-col justify-between flex-1 relative">
        <div className="pr-6">
          <span className="text-xs font-semibold text-[#FFA54A] mb-1 block">{area}</span>
          <span className="block text-sm font-bold text-[#000] mb-1">
            {truncateZenkakuText(title, 19)}
          </span>
          <div className="text-xs text-[#000000] mb-1">{date}</div>
          <p className="text-xs text-[#000000] line-clamp-2 min-h-[2.5em] mb-1">{description}</p>
          <div className="flex flex-wrap gap-1">
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
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="text-[10px] text-[#9F8372] underline"
              >
                タグを全部見る
              </button>
            )}
          </div>
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

      {/* タグモーダル */}
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

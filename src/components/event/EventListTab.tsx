'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FavoriteEvent {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  area: string;
  isPast: boolean;
}

type FavoriteEventApiResponse = {
  event_id: string;
  image_url: string;
  event_name: string;
  date: string;
  area: string;
};


export default function EventListTab() {
  const [favorites, setFavorites] = useState<FavoriteEvent[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem('user_id');
    if (stored) {
      setUserId(Number(stored));
    }
  }, []);
  const user_id = userId;
  console.log("user_id:", user_id)

  useEffect(() => {
    if (userId === null) return; // ← ここでガード！
  
    const fetchFavorites = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/favorites/${userId}`);
      const data = await res.json();
  
      const now = new Date();
  
      const events = data.favorites
        .map((e: FavoriteEventApiResponse) => ({
          id: e.event_id,
          imageUrl: e.image_url,
          title: e.event_name,
          area: e.area,
          date: e.date,
          isPast: new Date(e.date) < now,
        }))
        .sort((a: FavoriteEvent, b: FavoriteEvent) => {
          const aTime = new Date(a.date).getTime();
          const bTime = new Date(b.date).getTime();
          if (a.isPast === b.isPast) return aTime - bTime;
          return a.isPast ? 1 : -1;
        });
  
      setFavorites(events);
    };
  
    fetchFavorites();
  }, [userId]);

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-md mx-auto space-y-4">
      {favorites.map((event) => (
        <div key={event.id} className="space-y-4"> {/* ← ここでスペースを確保 */}
        <Link href={`/eventdetail/${event.id}`}>
          <div
            className={`flex items-center gap-4 p-3 rounded shadow bg-white relative transition-opacity ${
              event.isPast ? 'opacity-50' : ''
            } hover:bg-[#F9F6F2] cursor-pointer`}
          >
            <Image
              src={event.imageUrl || '/images/no-image.png'}
              alt={event.title}
              width={96}
              height={96}
              className="object-cover rounded"
            />
    
            {/* イベント情報 */}
            <div className="flex-1">
              <div className="text-xs text-[#FFA54A] font-semibold mb-1">{event.area}</div>
              <div className="font-bold text-sm truncate text-[#562305]">{event.title}</div>
              <div className="text-xs text-[#9F8372] mt-1">{event.date}</div>
            </div>
    
            {/* 削除ボタン */}
            <button
              onClick={(e) => {
                e.preventDefault();        // ← ページ遷移を防ぐ
                e.stopPropagation();
                handleRemove(event.id);
              }}
              aria-label="削除"
            >
              <Trash2 className="w-5 h-5 text-[#D4C8BB] hover:text-red-400" />
            </button>
          </div>
        </Link>
      </div>
      ))}

      {favorites.length === 0 && (
        <div className="text-center text-sm text-[#9F8372] pt-10">
          お気に入りイベントはまだありません。
        </div>
      )}
    </div>
  );
}

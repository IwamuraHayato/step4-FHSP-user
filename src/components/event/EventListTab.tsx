'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface FavoriteEvent {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  area: string;
  isPast: boolean;
}

const mockFavorites: FavoriteEvent[] = [
  {
    id: '1',
    imageUrl: '/images/event1.jpg',
    title: '福マルシェ @アイランドシティ',
    area: '福岡市東区',
    date: '2025/04/13',
    isPast: false,
  },
  {
    id: '2',
    imageUrl: '/images/event2.jpg',
    title: '福岡城さくらまつり',
    area: '福岡市中央区',
    date: '2025/03/01',
    isPast: true,
  },
  {
    id: '3',
    imageUrl: '/images/event3.jpg',
    title: '謎解きスタンプラリー',
    area: '福岡市西区',
    date: '2025/04/20',
    isPast: false,
  },
  {
    id: '4',
    imageUrl: '/images/event4.jpg',
    title: 'いちご狩りフェスタ',
    area: '古賀市',
    date: '2025/04/10',
    isPast: false,
  },
  {
    id: '5',
    imageUrl: '/images/event5.jpg',
    title: 'CHIKUHOU酒まつり',
    area: '飯塚市',
    date: '2025/03/29',
    isPast: true,
  },
  {
    id: '6',
    imageUrl: '/images/event6.jpg',
    title: '久留米花まつり',
    area: '久留米市',
    date: '2025/04/15',
    isPast: false,
  },
  {
    id: '7',
    imageUrl: '',
    title: '春の花と音楽フェス',
    area: '北九州市',
    date: '2025/04/22',
    isPast: false,
  },
  {
    id: '8',
    imageUrl: '',
    title: 'こどもと自然体験',
    area: '太宰府市',
    date: '2025/04/08',
    isPast: false,
  },
  {
    id: '9',
    imageUrl: '',
    title: 'まちなかウォーキング',
    area: '糸島市',
    date: '2025/04/18',
    isPast: false,
  },
  {
    id: '10',
    imageUrl: '',
    title: '図書館でおはなし会',
    area: '宗像市',
    date: '2025/03/28',
    isPast: true,
  },
];

export default function EventListTab() {
  const [favorites, setFavorites] = useState<FavoriteEvent[]>(() => {
    const now = new Date();
    return [...mockFavorites]
      .map((e) => ({
        ...e,
        isPast: new Date(e.date) < now,
      }))
      .sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        if (a.isPast === b.isPast) return aTime - bTime; // 同じ未来 or 過去 → 昇順
        return a.isPast ? 1 : -1; // 未来優先
      });
  });

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-md mx-auto space-y-4">
      {favorites.map((event) => (
        <div
          key={event.id}
          className={`flex items-center gap-4 p-3 rounded shadow bg-white relative transition-opacity ${
            event.isPast ? 'opacity-50' : ''
          }`}
        >
          {/* 画像 or No image */}
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-24 h-24 object-cover rounded"
            />
          ) : (
            <div className="w-24 h-24 bg-[#F0EDE3] text-xs text-[#D4C8BB] text-bold flex items-center justify-center rounded">
              No image
            </div>
          )}

          {/* イベント情報 */}
          <div className="flex-1">
            <div className="text-xs text-[#FFA54A] font-semibold mb-1">{event.area}</div>
            <div className="font-bold text-sm truncate text-[#562305]">{event.title}</div>
            <div className="text-xs text-[#9F8372] mt-1">{event.date}</div>
          </div>

          {/* 削除ボタン */}
          <button onClick={() => handleRemove(event.id)} aria-label="削除">
            <Trash2 className="w-5 h-5 text-[#D4C8BB] hover:text-red-400" />
          </button>
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

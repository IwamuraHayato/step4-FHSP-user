'use client';

import { useState } from 'react';
import EventCard from '@/components/home/EventCard';
import EventCarousel from '@/components/event/EventCarousel';

export default function EventSearchTab() {
  const [keyword, setKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const allEvents = [
    {
      id: 'e1',
      imageUrl: '/images/event1.jpg',
      area: '福岡市東区',
      title: '福マルシェ @アイランドシティ',
      date: '2025/04/13',
      description: '自然あふれる公園で開催される地元グルメイベント',
      tags: ['地域活性化', 'グルメ', 'のんびり派'],
      points: 100,
    },
    {
      id: 'e2',
      imageUrl: '/images/event2.jpg',
      area: '福岡市中央区',
      title: '福岡城さくらまつり',
      date: '2025/04/01',
      description: 'お花見と出店が楽しめる春の風物詩！',
      tags: ['お祭り', 'のんびり派', 'エンタメ'],
    },
  ];

  const handleSearch = () => {
    const results = allEvents.filter((event) => {
      const matchKeyword = keyword === '' || event.title.includes(keyword) || event.description.includes(keyword);
      const matchDate = selectedDate === '' || event.date === selectedDate;
      return matchKeyword && matchDate;
    });
    setSearchResults(results);
  };

  return (
    <div className="px-4 py-4 max-w-md mx-auto space-y-6">
      {/* 🔍 検索フィールド */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <input
          type="text"
          placeholder="キーワードを入力"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="input input-bordered w-full border-[#D4C8BB]"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input input-bordered w-full border-[#D4C8BB]"
        />

        <button
          onClick={handleSearch}
          className="btn btn-block bg-[#FFA54A] hover:bg-[#FF8E1D] text-white"
        >
          検索
        </button>
      </div>

      {/* 🎠 イベントカルーセル（未検索時のみ） */}
      {searchResults.length === 0 && (
        <EventCarousel events={allEvents.slice(0, 5)} />
      )}

      {/* 📄 検索結果 */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {searchResults.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      )}
    </div>
  );
}

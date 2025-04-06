'use client';

import { useState } from 'react';
import EventCard from '@/components/home/EventCard';
import Pagination from '@/components/common/Pagination';

export default function EventSearchTab() {
  const [keyword, setKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 10;

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
    // 👇 ダミーデータをあと数件追加
    {
      id: 'e3',
      imageUrl: '/images/event3.jpg',
      area: '福岡市西区',
      title: '謎解きスタンプラリー',
      date: '2025/04/20',
      description: '商店街で謎解き体験イベント！',
      tags: ['ウォーキング', 'アクティブ'],
    },
    {
      id: 'e4',
      imageUrl: '/images/event4.jpg',
      area: '古賀市',
      title: 'いちご狩りフェスタ',
      date: '2025/04/10',
      description: 'いちごいっぱいの春イベント',
      tags: ['スイーツ', '学び・体験'],
    },
    {
      id: 'e5',
      imageUrl: '/images/event5.jpg',
      area: '飯塚市',
      title: 'CHIKUHOU酒まつり',
      date: '2025/03/29',
      description: '地元のお酒を楽しもう',
      tags: ['グルメ', 'お祭り'],
    },
    {
      id: 'e6',
      imageUrl: '/images/event6.jpg',
      area: '久留米市',
      title: '久留米花まつり',
      date: '2025/04/15',
      description: '花いっぱいのまちで癒される',
      tags: ['文化・歴史'],
    },
    // 必要に応じてさらにイベントを追加
  ];

  const filteredEvents = allEvents.filter((event) => {
    const matchKeyword =
      keyword === '' ||
      event.title.includes(keyword) ||
      event.description?.includes(keyword);
    const matchDate = selectedDate === '' || event.date === selectedDate;
    return matchKeyword && matchDate;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="px-4 py-4 mt-4 max-w-md mx-auto space-y-6">
      {/* 🔍 検索フィールド */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <input
          type="text"
          placeholder="キーワードを入力"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full border border-[#D4C8BB] px-4 py-2 rounded"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border border-[#D4C8BB] px-4 py-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="w-full py-2 px-4 rounded font-bold text-white bg-[#FFA54A] hover:bg-[#FF8E1D] transition-colors duration-300"
        >
          検索
        </button>
      </div>

      {/* 📄 イベントカード */}
      <div className="grid grid-cols-2 gap-3">
        {currentEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {/* 🔢 ページネーション */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

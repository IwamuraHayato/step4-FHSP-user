'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import EventCard from '@/components/home/EventCard';

export default function EventSearchTab() {
  const [keyword, setKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const allEvents = [
    {
      id: 'e1', imageUrl: '/images/event1.jpg', area: '福岡市東区', title: '福マルシェ @アイランドシティ', date: '2025-04-13', description: '自然あふれる公園で開催される地元グルメイベント', tags: ['地域活性化', 'グルメ', 'のんびり派'], points: 100,
    },
    {
      id: 'e2', imageUrl: '/images/event2.jpg', area: '福岡市中央区', title: '福岡城さくらまつり', date: '2025-04-01', description: 'お花見と出店が楽しめる春の風物詩！', tags: ['お祭り', 'のんびり派', 'エンタメ'],
    },
    {
      id: 'e3', imageUrl: '/images/event3.jpg', area: '福岡市西区', title: '謎解きスタンプラリー', date: '2025-04-20', description: '商店街で謎解き体験イベント！', tags: ['ウォーキング', 'アクティブ'],
    },
    {
      id: 'e4', imageUrl: '/images/event4.jpg', area: '古賀市', title: 'いちご狩りフェスタ', date: '2025-04-10', description: 'いちごいっぱいの春イベント', tags: ['スイーツ', '学び・体験'],
    },
    {
      id: 'e5', imageUrl: '/images/event5.jpg', area: '飯塚市', title: 'CHIKUHOU酒まつり', date: '2025-03-29', description: '地元のお酒を楽しもう', tags: ['グルメ', 'お祭り'],
    },
    {
      id: 'e6', imageUrl: '/images/event6.jpg', area: '久留米市', title: '久留米花まつり', date: '2025-04-15', description: '花いっぱいのまちで癒される', tags: ['文化・歴史'],
    },
    {
      id: 'e7', imageUrl: '/images/event1.jpg', area: '北九州市', title: 'こども未来フェス', date: '2025-04-18', description: '親子で未来を体験するイベント', tags: ['学び・体験', 'アクティブ'],
    },
    {
      id: 'e8', imageUrl: '/images/event2.jpg', area: '太宰府市', title: 'まちなかマルシェ', date: '2025-04-07', description: '特産品やスイーツが勢ぞろい', tags: ['グルメ', '地域活性化'],
    },
    {
      id: 'e9', imageUrl: '/images/event3.jpg', area: '宗像市', title: '図書館でおはなし会', date: '2025-04-05', description: '親子で楽しむ読み聞かせイベント', tags: ['のんびり派', '学び・体験'],
    },
    {
      id: 'e10', imageUrl: '/images/event4.jpg', area: '春日市', title: '春の桜まつり', date: '2025-04-12', description: '桜と音楽とグルメで楽しもう！', tags: ['お祭り', 'エンタメ'],
    },
    {
      id: 'e11', imageUrl: '/images/event5.jpg', area: '筑紫野市', title: 'アスレチックチャレンジ', date: '2025-04-19', description: 'こども向けの運動体験イベント', tags: ['アクティブ'],
    },
  ];

  const availableTags = [
    'グルメ', 'お祭り', '地域活性化', 'のんびり派', 'アクティブ',
    '学び・体験', '文化・歴史', 'スイーツ', 'エンタメ', 'ウォーキング'
  ];

  const handleSearch = () => {
    setSearchTriggered(true);
    setSearchKeyword(keyword);
    setSearchDate(selectedDate);
    setSearchTags(selectedTags);
    setVisibleCount(8);
  };

  const clearKeyword = () => setKeyword('');
  const clearDate = () => setSelectedDate('');

  const filteredEvents = searchTriggered
    ? allEvents.filter((event) => {
        const matchKeyword =
          searchKeyword === '' ||
          event.title.includes(searchKeyword) ||
          event.description?.includes(searchKeyword);
        const matchDate =
          searchDate === '' ||
          event.date === new Date(searchDate).toISOString().split('T')[0];
        const matchTags =
          searchTags.length === 0 ||
          searchTags.every((tag) => event.tags?.includes(tag));
        return matchKeyword && matchDate && matchTags;
      })
    : allEvents;

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  return (
    <div className="px-4 py-4 mt-4 max-w-md mx-auto space-y-6">
      {/* 🔍 検索フィールド */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="キーワードを入力"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border border-[#D4C8BB] px-4 py-2 rounded pr-10"
          />
          {keyword && (
            <button
              onClick={clearKeyword}
              className="absolute top-2 right-2 text-[#D4C8BB] hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-[#D4C8BB] px-4 py-2 rounded pr-10"
          />
          {selectedDate && (
            <button
              onClick={clearDate}
              className="absolute top-2 right-2 text-[#D4C8BB] hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* タグ選択 */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
              className={`flex-shrink-0 text-xs px-3 py-1 rounded-full border transition whitespace-nowrap ${
                selectedTags.includes(tag)
                  ? 'bg-[#FFA54A] text-white border-[#FFA54A]'
                  : 'bg-[#F0EDE3] text-[#9F8372] border-[#D4C8BB]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={handleSearch}
          className="w-full py-2 px-4 rounded font-bold text-white bg-[#FFA54A] hover:bg-[#FF8E1D] transition-colors duration-300"
        >
          検索
        </button>
      </div>

      {/* 🔍 検索件数 */}
      {searchTriggered && (
        <div className="text-sm text-[#9F8372] font-medium">
          検索結果：{filteredEvents.length}件
        </div>
      )}

      {/* 📄 イベントカード */}
      <div className="grid grid-cols-2 gap-3">
        {visibleEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {/* ▶ もっとみる */}
      {visibleCount < filteredEvents.length && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="text-sm text-[#9F8372] underline hover:opacity-80"
          >
            もっとみる ＞
          </button>
        </div>
      )}
    </div>
  );
}
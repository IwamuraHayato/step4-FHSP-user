'use client';

import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import EventCard from '@/components/home/EventCard';
import Link from 'next/link';

type EventApiResponse = {
  id: string;
  title: string;
  description?: string;
  date: string;
  area: string;
  tags?: string[];
  imageUrl: string;
};

type FavoriteEvent = EventApiResponse & {
  isPast: boolean;
};

export default function EventSearchTab() {
  const [keyword, setKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<FavoriteEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const availableTags = [
    'グルメ', 'お祭り', '地域活性化', 'のんびり派', 'アクティブ',
    '学び・体験', '文化・歴史', 'スイーツ', 'エンタメ', 'ウォーキング', 'AI抽出', '福岡県公式'
  ];

  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem('user_id');
    if (stored) {
      setUserId(Number(stored));
    }
  }, []);

  useEffect(
    () => {
      const fetchUpcomingEvents = async () => {
        setIsLoading(true);
        try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events/upcoming`);
          const data = await res.json();
          const now = new Date();
      
          const events = data.events.map((e: EventApiResponse) => ({
            ...e,
            isPast: new Date(e.date) < now,
          }));
      
          setAllEvents(events);
        }catch(error){
          console.error('イベント取得エラー:', error);
        } finally {
          setIsLoading(false); 
        }
      };
    
      fetchUpcomingEvents();
    }, []
  );


  const fetchEvents = async () => {
    const tagString = selectedTags.join(',');
    const query = new URLSearchParams({
      keyword,
      date: selectedDate,
      tags: tagString
    });
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events/search?${query.toString()}`);
    const data = await res.json();
    console.log(data)
    const now = new Date();
  
    const events = data.events.map((e: EventApiResponse) => ({
      ...e,
      isPast: new Date(e.date) < now,
    }));
  
    setSearchTriggered(true);
    setSearchKeyword(keyword);
    setSearchDate(selectedDate);
    setSearchTags(selectedTags);
    setVisibleCount(8);
    setAllEvents(events);
  };

  const handleSearch = () => {
    setSearchTriggered(true);
    setSearchKeyword(keyword);
    setSearchDate(selectedDate);
    setSearchTags(selectedTags);
    setVisibleCount(8);
    fetchEvents();
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
      {isLoading ? (
        <div className="text-center py-10">
          <Loader2 className="w-6 h-6 text-[#9F8372] animate-spin mx-auto" />
          <div className="text-[#9F8372] text-sm mt-2">読み込み中...</div>
        </div>
      ) : (
        <div className="grid grid-cols gap-3">
          {visibleEvents.map((event) => (
            <Link href={`/eventdetail/${event.id}`} key={event.id}>
              {userId !== null && (
                <EventCard {...event} user_id={userId} />
              )}
            </Link>
          ))}
        </div>
      )}

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
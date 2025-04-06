'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from '@/components/home/EventCard';

interface Event {
  id: string;
  imageUrl: string;
  area: string;
  title: string;
  date: string;
  description?: string;
  tags: string[];
  points?: number;
  defaultFavorite?: boolean;
}

interface EventCarouselProps {
  events: Event[];
}

export default function EventCarousel({ events }: EventCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220; // カード幅に合わせる
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // ✅ クライアントマウント後のみ描画（Hydration mismatch 対策）
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative">
      {/* 左スクロール */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow"
        aria-label="左へ"
      >
        <ChevronLeft className="w-5 h-5 text-[#9F8372]" />
      </button>

      {/* イベントカードの横スクロール表示 */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-4"
      >
        {events.map((event) => (
          <div key={event.id} className="min-w-[200px] flex-shrink-0">
            <EventCard {...event} />
          </div>
        ))}
      </div>

      {/* 右スクロール */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow"
        aria-label="右へ"
      >
        <ChevronRight className="w-5 h-5 text-[#9F8372]" />
      </button>
    </div>
  );
}

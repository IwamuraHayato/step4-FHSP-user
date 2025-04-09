'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-style.css'; // Tailwindカスタム上書き

interface FavoriteEvent {
  id: string;
  title: string;
  date: string; // 'YYYY-MM-DD'
  area: string;
}

const mockEvents: FavoriteEvent[] = [
  {
    id: '1',
    title: '福マルシェ @アイランドシティ',
    area: '福岡市東区',
    date: '2025-04-13',
  },
  {
    id: '2',
    title: 'こども自然体験と学びの春',
    area: '糸島市',
    date: '2025-04-13',
  },
  {
    id: '3',
    title: '春の花と音楽フェス in 久留米 ',
    area: '久留米市',
    date: '2025-04-13',
  },
  {
    id: '4',
    title: '図書館でおはなし会',
    area: '宗像市',
    date: '2025-04-15',
  },
];

export default function EventCalendarTab() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const eventsByDate = mockEvents.reduce((acc, event) => {
    acc[event.date] = acc[event.date] || [];
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, FavoriteEvent[]>);

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
  };

  const selectedDateStr = selectedDate?.toISOString().split('T')[0];
  const selectedEvents = selectedDateStr ? eventsByDate[selectedDateStr] || [] : [];

  return (
    <div className="px-4 pt-6 pb-32 max-w-md mx-auto space-y-4">
      <Calendar
        onClickDay={handleDateClick}
        formatDay={(locale, date) => String(date.getDate())}
        tileContent={({ date }) => {
          const key = date.toISOString().split('T')[0];
          const events = eventsByDate[key] || [];
          return (
            <div className="mt-1 space-y-0.5">
              {events.slice(0, 3).map((e) => (
                <div
                  key={e.id}
                  className="calendar-event-title"
                >
                  {e.title}
                </div>
              ))}
              {events.length > 3 && (
                <div className="text-[10px] text-[#9F8372] text-center">+{events.length - 3}件</div>
              )}
            </div>
          );
        }}
      />


      {/* 🔽 選択した日のイベントリスト */}
      {selectedDate && (
        <div className="mt-4 space-y-3">
          <h3 className="text-[#562305] font-bold text-sm">
            {selectedDateStr} のイベント
          </h3>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((e) => (
              <div key={e.id} className="bg-white p-3 rounded shadow">
                <div className="text-xs text-[#FFA54A] font-semibold mb-1">{e.area}</div>
                <div className="text-sm font-bold text-[#562305]">{e.title}</div>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#9F8372]">イベントはありません</p>
          )}
        </div>
      )}
    </div>
  );
}

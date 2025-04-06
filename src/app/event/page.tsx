'use client';

import { useState } from 'react';
import EventSearchTab from '@/components/event/EventSearchTab';
import EventListTab from '@/components/event/EventListTab';
import EventCalendarTab from '@/components/event/EventCalendarTab';
import HomeHeader from '@/components/common/HomeHeader';

export default function EventPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'list' | 'calendar'>('search');

  return (
    <div className="min-h-screen bg-[#F0EDE3] pb-24">
      <HomeHeader />

        {/* タブメニュー */}
        <div className="flex justify-around bg-[#E9E4DC] text-[#9F8372] font-bold">
        {['search', 'list', 'calendar'].map((tab) => (
            <button
            key={tab}
            onClick={() => setActiveTab(tab as 'search' | 'list' | 'calendar')}
            className={`flex-1 py-3 transition-colors duration-200
                ${
                activeTab === tab
                    ? 'bg-[#D4C8BB] text-[#562305]'
                    : 'hover:bg-[#E0D6CC] hover:text-[#562305]'
                }`}
            >
            {tab === 'search' && 'Search'}
            {tab === 'list' && 'List'}
            {tab === 'calendar' && 'Calendar'}
            </button>
        ))}
        </div>

      {/* タブ切り替え */}
      {activeTab === 'search' && <EventSearchTab />}
      {activeTab === 'list' && <EventListTab />}
      {activeTab === 'calendar' && <EventCalendarTab />}
    </div>
  );
}

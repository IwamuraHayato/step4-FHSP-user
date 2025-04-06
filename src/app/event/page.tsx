'use client';

import { useState } from 'react';
import EventSearchTab from '@/components/event/EventSearchTab';
import EventListTab from '@/components/event/EventListTab';
import EventCalendarTab from '@/components/event/EventCalendarTab';
import HomeHeader from '@/components/common/HomeHeader';
import FloatingButton from '@/components/common/FloatingButton';
import BottomNav from '@/components/common/BottomNav';

export default function EventPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'list' | 'calendar'>('search');

  return (
    <div className="min-h-screen bg-[#F0EDE3] pb-32 relative">
      <HomeHeader />

      {/* タブメニュー */}
      <div className="flex justify-around bg-[#E9E4DC] text-[#9F8372] text-sm font-bold">
        {['search', 'list', 'calendar'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'search' | 'list' | 'calendar')}
            className={`flex-1 py-3 transition-colors duration-200 hover:bg-[#e0d7cb] ${
              activeTab === tab ? 'bg-[#D4C8BB] text-[#562305]' : ''
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

      {/* 共通のボタン & ナビゲーション */}
      <FloatingButton href="/kids-compass" className="bottom-16 right-[-12px] w-32 h-32" />
      <BottomNav />
    </div>
  );
}

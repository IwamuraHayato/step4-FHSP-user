'use client';

import Image from 'next/image';
import { UserPlus, Bell } from 'lucide-react';

export default function HomeHeader() {
  return (
    <header className="relative bg-[#F0EDE3] h-[100px]">
      {/* 左上：UserPlus + Bell 横並び */}
      <div className="absolute left-4 top-4 flex items-center gap-3">
        <button className="text-[#562305] hover:opacity-70">
          <UserPlus className="w-6 h-6" />
        </button>
        <button className="text-[#562305] hover:opacity-70">
          <Bell className="w-6 h-6" />
        </button>
      </div>

      {/* ロゴ中央配置（上下左右） */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80px] h-[40px] mx-auto">
          <Image
            src="/images/logo.png"
            alt="HAPPY SMILE PASSPORT ロゴ"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* 山イラスト右上配置 */}
      <div className="absolute right-2 top-2 w-[160px] h-[80px]">
        <Image
          src="/images/mountain.png"
          alt="山のイラスト"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </header>
  );
}

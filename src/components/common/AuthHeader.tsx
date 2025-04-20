'use client';

import React from 'react';
import Image from 'next/image';

export default function AuthHeader() {
  return (
    <header className="relative bg-[#F0EDE3] h-[100px]">
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

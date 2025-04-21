'use client';

import Link from 'next/link';
import { Home, QrCode, Gem, Star, User } from 'lucide-react';

export default function BottomNav() {
  const navClass = 'flex flex-col items-center text-xs';
  const iconClass = 'w-6 h-6 mb-1';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D4C8BB] h-20 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-full text-[#9F8372]">
        <Link href="/home" className={`${navClass} hover:text-[#562305]`}>
          <Home className={iconClass} />
          ホーム
        </Link>
        <Link
          href="#"
          onClick={(e) => e.preventDefault()}
          className={`${navClass} hover:text-[#562305]`}
        >
          <QrCode className={iconClass} />
          QRコード
        </Link>
        <Link href="/quest" className={`${navClass} hover:text-[#562305]`}>
          <Gem className={iconClass} />
          クエスト
        </Link>
        <Link href="/event" className={`${navClass} hover:text-[#562305]`}>
          <Star className={iconClass} />
          イベント
        </Link>
        <Link
        href="#"
        onClick={(e) => e.preventDefault()}
        className={`${navClass} hover:text-[#562305]`}
        >
        <User className={iconClass} />
        アカウント
        </Link>
      </div>
    </nav>
  );
}

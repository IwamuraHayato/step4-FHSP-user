'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserPlus, X, Bell } from 'lucide-react';

export default function HomeHeader() {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 600); // アニメーションと同じ長さに！
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="relative bg-[#F0EDE3] h-[100px]">
        {/* 左上：UserPlus + Bell */}
        <div className="absolute left-6 top-10 flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="text-[#562305] hover:opacity-70 z-[9999] relative"
          >
            <UserPlus className="w-6 h-6" />
          </button>
          <button
            onClick={() => alert('🔔 通知機能は今後実装予定です！')}
            className="text-[#562305] hover:opacity-70 z-[9999] relative"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>

        {/* 中央ロゴ（クリックで /home に遷移） */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/home" className="relative w-[80px] h-[40px] mx-auto">
            <Image
              src="/images/logo.png"
              alt="HAPPY SMILE PASSPORT ロゴ"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>
        </div>

        {/* 右上：山のイラスト */}
        <div className="absolute right-2 top-2 w-[160px] h-[80px]">
          <Image
            src="/images/mountain.png"
            alt="山のイラスト"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </header>

      {/* ✅ QRコードモーダル */}
      {showModal && (
      <div className="fixed inset-0 z-[9999] bg-black/40 flex items-end justify-center">
        <div
          className={`bg-white w-full max-w-sm rounded-t-2xl px-6 pt-6 pb-36 relative transition-all duration-300 ${
            closing ? 'animate-slideDown' : 'animate-slideUp'
          }`}
        >
          {/* 閉じるボタン */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-[#562305] hover:text-red-400"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-center font-bold text-[#562305] mb-2">家族登録</h2>
          <hr className="border-[#E9E4DC] mb-4" />

          <img
            src="/images/sample-qr.png"
            alt="QRコード"
            className="mx-auto w-32 h-32"
          />

          <p className="text-sm text-center text-[#562305] mt-4 mb-6 leading-relaxed">
            QRコードを読み込む or シェアボタンで<br />
            家族を招待・登録できます！
          </p>

          <button className="mx-auto flex flex-col items-center">
            <div className="bg-[#A37B68] text-white rounded-full w-12 h-12 flex items-center justify-center mb-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
                <path d="M16 6l-4-4-4 4" />
                <path d="M12 2v14" />
              </svg>
            </div>
            <span className="text-xs text-[#562305]">シェア機能をつかう</span>
          </button>
        </div>
      </div>
    )}
    </>
  );
}

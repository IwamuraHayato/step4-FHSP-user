'use client';

import Image from 'next/image';

interface QuestMenuProps {
  onOpenCharacterModal: () => void;
}

export default function QuestMenu({ onOpenCharacterModal }: QuestMenuProps) {
  return (
    <div className="absolute left-4 top-[50%] z-40 flex flex-col gap-4">
      {/* キャラ変更ボタン */}
      <button
        className="w-14 h-14 rounded-full bg-[#E2CEFD] border-4 border-white shadow-xl flex items-center justify-center text-[#FFA54A] hover:opacity-80 transition"
        onClick={onOpenCharacterModal}
      >
        <Image
        src="/images/icons/icon_universe.png"
        alt="宇宙アイコン"
        width={36}
        height={36}
      />
      </button>

      {/* 通知ボタン */}
      <button className="w-14 h-14 rounded-full bg-[#ABDCFF] border-4 border-white shadow-xl flex items-center justify-center text-[#FFA54A] hover:opacity-80 transition">
      <Image
        src="/images/icons/icon_megaphone.png"
        alt="メガフォンアイコン"
        width={36}
        height={36}
      />
      </button>

      {/* プレゼントボタン */}
    <button className="w-14 h-14 rounded-full bg-[#B9EDDB] border-4 border-white shadow-xl flex items-center justify-center hover:opacity-80 transition">
      <Image
        src="/images/icons/icon_present.png"
        alt="プレゼントアイコン"
        width={30}
        height={30}
      />
    </button>

      {/* あまおうブーストボタン */}
      <button className="w-16 h-16 rounded-md bg-[#FEE8F2] border-4 border-white shadow-xl flex items-center justify-center text-white hover:opacity-90 transition">
      <Image
        src="/images/icons/icon_amaou.png"
        alt="あまおうブーストアイコン"
        width={40}
        height={40}
      />
      </button>
    </div>
  );
}

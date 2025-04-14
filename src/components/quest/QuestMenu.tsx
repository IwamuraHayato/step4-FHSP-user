'use client';

import { Bell, Gift, Zap, User, Cat, PartyPopper, Rocket } from 'lucide-react';

interface QuestMenuProps {
  onOpenCharacterModal: () => void;
}

export default function QuestMenu({ onOpenCharacterModal }: QuestMenuProps) {
  return (
    <div className="absolute left-4 top-[50%] z-40 flex flex-col gap-4">
      {/* キャラ変更ボタン */}
      <button
        className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-[#FFA54A] hover:opacity-80 transition"
        onClick={onOpenCharacterModal}
      >
        <Cat className="w-5 h-5" />
      </button>

      {/* 通知ボタン */}
      <button className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-[#FFA54A] hover:opacity-80 transition">
        <PartyPopper className="w-5 h-5" />
      </button>

      {/* プレゼントボタン */}
      <button className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-[#FFA54A] hover:opacity-80 transition">
        <Gift className="w-5 h-5" />
      </button>

      {/* あまおうブーストボタン */}
      <button className="w-12 h-12 rounded-md bg-[#FFA54A] shadow flex items-center justify-center text-white hover:opacity-90 transition">
        <Rocket className="w-5 h-5" />
      </button>
    </div>
  );
}

'use client';

import { X } from 'lucide-react';

interface SpecialQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const specialQuests = [
  {
    id: 's1',
    title: 'お気に入り登録したイベントに参加してQRコードを取得する',
    description: '参加イベントでQRをスキャンしよう！',
    completed: true,
    reward: 100,
  },
  {
    id: 's2',
    title: 'マチナカクエストでQRコードを3つ取得する',
    description: 'まちなかを歩いてQRを3つ集めよう！',
    completed: false,
    reward: 150,
  },
];

export default function SpecialQuestModal({ isOpen, onClose }: SpecialQuestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 animate-slideUp relative">
        {/* 閉じる */}
        <button onClick={onClose} className="absolute top-4 right-4 text-[#562305] hover:text-red-400">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-[#562305] font-bold mb-4">スペシャルクエスト</h2>

        <div className="space-y-4">
          {specialQuests.map((quest) => (
            <div
              key={quest.id}
              className="border border-[#D4C8BB] rounded-lg px-4 py-3 bg-[#F9F7F2] text-[#562305]"
            >
              <h3 className="font-semibold text-sm">{quest.title}</h3>
              <p className="text-xs text-[#9F8372] mt-1">{quest.description}</p>

              {quest.completed ? (
                <button className="mt-2 bg-[#FFA54A] text-white text-xs px-3 py-1 rounded hover:bg-[#FF8E1D]">
                  {quest.reward}pt 受け取る
                </button>
              ) : (
                <span className="mt-2 inline-block text-[10px] text-[#9F8372]">未達成</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

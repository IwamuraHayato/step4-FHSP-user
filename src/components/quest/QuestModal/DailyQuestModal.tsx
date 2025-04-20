'use client';

import { X } from 'lucide-react';

interface DailyQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const dailyQuests = [
  { id: 1, title: 'ログインボーナス', done: true },
  { id: 2, title: 'イベントページを15秒見る', done: false },
  { id: 3, title: 'CMを見る', done: false },
  { id: 4, title: 'イベント情報を家族に共有する', done: false },
];

export default function DailyQuestModal({ isOpen, onClose }: DailyQuestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#562305] hover:text-red-400"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center font-bold text-[#562305] text-lg mb-4">デイリークエスト</h2>

        <ul className="space-y-2">
          {dailyQuests.map((quest) => (
            <li
              key={quest.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex justify-between items-center ${
                quest.done ? 'bg-[#F0EDE3] text-[#9F8372]' : 'bg-[#FFF7ED] text-[#562305]'
              }`}
            >
              {quest.title}
              {quest.done ? <span className="text-green-500">達成済み</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

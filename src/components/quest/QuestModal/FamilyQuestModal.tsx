'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  reward: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const mockFamilyQuests: Quest[] = [
  {
    id: 'fq1',
    title: '家族みんながログインする',
    description: '今日、家族全員がログインしましたか？',
    completed: true,
    reward: 50,
  },
  {
    id: 'fq2',
    title: '家族みんなで次の街へ到着する',
    description: '全員で到着できたら達成！',
    completed: false,
    reward: 100,
  },
  {
    id: 'fq3',
    title: 'メッセージスタンプを10回押す',
    description: '家族間でスタンプを10回押してみよう',
    completed: true,
    reward: 30,
  },
];

export default function FamilyQuestModal({ isOpen, onClose }: Props) {
  const [quests] = useState(mockFamilyQuests);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 animate-slideUp relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#562305] hover:text-red-400"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center font-bold text-[#562305] mb-4">ファミリークエスト</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className="bg-[#F8F4EF] rounded-lg p-4 shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-semibold text-[#562305]">{quest.title}</p>
                <p className="text-xs text-[#9F8372]">{quest.description}</p>
              </div>
              <button
                disabled={!quest.completed}
                className={`text-sm font-bold px-3 py-1 rounded ${
                  quest.completed
                    ? 'bg-[#FFA54A] text-white hover:bg-[#FF8E1D]'
                    : 'bg-gray-300 text-white cursor-not-allowed'
                }`}
              >
                {quest.completed ? `${quest.reward}pt受取` : '未達成'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

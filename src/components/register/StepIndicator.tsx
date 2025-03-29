'use client';

interface StepIndicatorProps {
  current: number;
}

const stepLabels = ['基本情報', 'スタイル', '認証', 'ポイント連携'];

export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex justify-center gap-6 mt-8 mb-2 px-4">
      {stepLabels.map((label, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-14"
        >
          {/* ステップ番号の丸 */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              index + 1 === current
                ? 'bg-[#FFA54A] text-white'
                : 'bg-[#D4C8BB] text-white'
            }`}
          >
            {index + 1}
          </div>

          {/* ラベル */}
          <span className="text-[10px] mt-1 text-center text-[#562305] whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

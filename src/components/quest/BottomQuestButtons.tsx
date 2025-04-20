'use client';

import Image from 'next/image';

interface BottomQuestButtonsProps {
  onDailyOpen: () => void;
  onFamilyOpen: () => void;
  onSpecialOpen: () => void;
  onRankingNavigate: () => void;
}

export default function BottomQuestButtons({
  onDailyOpen,
  onFamilyOpen,
  onSpecialOpen,
  onRankingNavigate,
}: BottomQuestButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#14AE5C] to-[#43C88A] py-responsive z-40">
      <div className="max-w-md mx-auto px-6 h-full flex justify-center items-center gap-x-6">
        <QuestButton
          icon={
            <Image
              src="/images/icons/icon_ichigo.png"
              alt="デイリー"
              width={40}
              height={40}
            />
          }
          label="デイリー"
          onClick={onDailyOpen}
          bgColor="bg-[#FFF78A]"
        />
        <QuestButton
          icon={
            <Image
              src="/images/icons/icon_house.png"
              alt="ファミリー"
              width={40}
              height={40}
            />
          }
          label="ファミリー"
          onClick={onFamilyOpen}
          bgColor="bg-[#FFD6AD]"
        />
        <QuestButton
          icon={
            <Image
              src="/images/icons/icon_flag.png"
              alt="スペシャル"
              width={48}
              height={48}
            />
          }
          label="スペシャル"
          onClick={onSpecialOpen}
          bgColor="bg-[#F7ADA7]"
        />
        <QuestButton
          icon={
            <Image
              src="/images/icons/icon_ranking.png"
              alt="ランキング"
              width={40}
              height={40}
            />
          }
          label="ランキング"
          onClick={onRankingNavigate}
          bgColor="bg-[#DDC2FF]"
        />
      </div>
    </div>
  );
}

function QuestButton({
  icon,
  label,
  onClick,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  bgColor: string;
}) {
  return (
    <div className="flex flex-col items-center text-white text-xs">
      <button
        onClick={onClick}
        className={`w-16 h-16 rounded-full ${bgColor} text-white flex items-center justify-center hover:opacity-80 transition border-4 border-white shadow-xl`}
      >
        {icon}
      </button>
      <span className="mt-1 text-white text-[8px] px-2 py-1 rounded-full font-semibold">
        {label}
      </span>
    </div>
  );
}

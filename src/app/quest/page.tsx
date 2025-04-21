'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestCard from '@/components/quest/QuestCard';
import CharacterDisplay from '@/components/quest/CharacterDisplay';
import QuestMenu from '@/components/quest/QuestMenu';
import CharacterSelectModal from '@/components/quest/CharacterSelectModal';
import BottomQuestButtons from '@/components/quest/BottomQuestButtons';
import DailyQuestModal from '@/components/quest/QuestModal/DailyQuestModal';
import FamilyQuestModal from '@/components/quest/QuestModal/FamilyQuestModal';
import { ChevronLeft } from 'lucide-react';

// 🔙 戻るボタン
function BackToHomeButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/home')}
      className="absolute top-2 left-2 bg-gray-300 bg-opacity-50 shadow rounded-full p-2 text-[#562305] transition z-50"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

export default function QuestPage() {
  const router = useRouter();

  const [isDaytime, setIsDaytime] = useState(true);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [characterSrc, setCharacterSrc] = useState('/images/characters/bababasuo.png');
  const [hasCustomCharacter, setHasCustomCharacter] = useState(false);

  const [showDailyModal, setShowDailyModal] = useState(false);
  const [showFamilyModal, setShowFamilyModal] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDaytime(hour >= 6 && hour < 18);

    const savedImage = localStorage.getItem('customCharacter');
    if (savedImage) {
      setCharacterSrc(savedImage);
      setHasCustomCharacter(true);
    }
  }, []);

  const handleCharacterSelect = (src: string, isCustom = false) => {
    setCharacterSrc(src);
    if (isCustom) {
      localStorage.setItem('customCharacter', src);
      setHasCustomCharacter(true);
    } else {
      localStorage.removeItem('customCharacter');
      setHasCustomCharacter(false);
    }
  };

  const backgroundClass = isDaytime
    ? 'bg-gradient-to-b from-[#BCEBFF] to-[#F2F8E4]'
    : 'bg-gradient-to-b from-[#7B80B8] to-[#E7DEF1]';

  return (
    <div className={`h-[100dvh] w-full ${backgroundClass} relative overflow-hidden`}>
      <BackToHomeButton />

      <main className="w-full max-w-[480px] px-4 pt-6 pb-36 mx-auto space-y-6 relative">
        <QuestMenu onOpenCharacterModal={() => setShowCharacterModal(true)} />

        <QuestCard
          familySteps={21500}
          userSteps={5740}
          userName="もりぃ"
          from="久山町"
          to="宗像市"
          percentage={60}
        />

        <CharacterDisplay characterSrc={characterSrc} />

        <CharacterSelectModal
          isOpen={showCharacterModal}
          onClose={() => setShowCharacterModal(false)}
          onSelect={handleCharacterSelect}
          hasCustomCharacter={hasCustomCharacter}
        />
      </main>

      <BottomQuestButtons
        onDailyOpen={() => setShowDailyModal(true)}
        onFamilyOpen={() => setShowFamilyModal(true)}
        onSpecialOpen={() => {}}
        onRankingNavigate={() => router.push('/ranking')}
      />

      <DailyQuestModal isOpen={showDailyModal} onClose={() => setShowDailyModal(false)} />
      <FamilyQuestModal isOpen={showFamilyModal} onClose={() => setShowFamilyModal(false)} />
    </div>
  );
}

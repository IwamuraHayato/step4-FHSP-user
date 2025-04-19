'use client';

import Image from 'next/image';
import { useState } from 'react';

const fallbackCharacter = '/images/characters/bababasuo.png';

const effects = ['jump', 'rotate', 'shake', 'shrink'] as const;
type EffectType = (typeof effects)[number] | 'float';

interface CharacterDisplayProps {
  characterSrc?: string; // 画像のパスを props 経由で受け取る
}

export default function CharacterDisplay({ characterSrc }: CharacterDisplayProps) {
  const [effect, setEffect] = useState<EffectType>('float');

  const handleClick = () => {
    const random = effects[Math.floor(Math.random() * effects.length)];
    setEffect(random);
    setTimeout(() => setEffect('float'), 700);
  };

  const isValidSrc = characterSrc && characterSrc.trim() !== '';
  const currentSrc = isValidSrc ? characterSrc : fallbackCharacter;

  return (
    <div className="relative h-[400px] w-full">
      <div className="fixed top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="w-[240px] h-[240px]">
          <Image
            onClick={handleClick}
            src={currentSrc}
            alt="キャラクター"
            width={240}
            height={240}
            className={`cursor-pointer w-full h-full object-contain transition-all duration-500
              ${effect === 'float' ? 'animate-float' : ''}
              ${effect === 'jump' ? 'animate-jump' : ''}
              ${effect === 'rotate' ? 'animate-rotate' : ''}
              ${effect === 'shake' ? 'animate-shake' : ''}
              ${effect === 'shrink' ? 'animate-shrink' : ''}
            `}
          />
        </div>
      </div>
    </div>
  );
}

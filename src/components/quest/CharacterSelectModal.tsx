'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface CharacterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (src: string, isCustom?: boolean) => void;
  hasCustomCharacter: boolean;
}

export default function CharacterSelectModal({
  isOpen,
  onClose,
  onSelect,
  // hasCustomCharacter,
}: CharacterSelectModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const predefinedCharacters = [
    { label: 'バババスオ', src: '/images/characters/bababasuo.png' },
    { label: 'メタ姉さん', src: '/images/characters/meta-neesan.png' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('customCharacter');
    if (saved) setCustomImage(saved);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setCustomImage(result);
      onSelect(result, true);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    localStorage.removeItem('customCharacter');
    setCustomImage(null);
    onSelect('/images/characters/bababasuo.png', false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-xl p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#562305] hover:text-red-400"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-[#562305] text-center mb-6">キャラクターを選ぶ</h2>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {predefinedCharacters.map((char) => (
            <button
              key={char.src}
              onClick={() => onSelect(char.src, false)}
              className="flex flex-col items-center hover:opacity-80"
            >
              <Image src={char.src} alt={char.label} width={80} height={80} />
              <span className="text-xs mt-1 text-[#562305]">{char.label}</span>
            </button>
          ))}

          {customImage ? (
            <button
              onClick={() => onSelect(customImage, true)}
              className="flex flex-col items-center hover:opacity-80"
            >
              <Image
                src={customImage}
                alt="手書き"
                width={80}
                height={80}
                className="object-contain"
              />
              <span className="text-xs mt-1 text-[#562305]">オリジナル</span>
            </button>
          ) : (
            <div
              className="flex flex-col items-center justify-center w-20 h-20 border border-dashed border-gray-300 hover:opacity-80 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="text-xs text-gray-400 text-center">
                イラストを<br />アップロード
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {customImage && (
          <div className="text-center">
            <button
              onClick={handleDelete}
              className="text-xs text-red-500 underline"
            >
              アップロード画像を削除する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  id: string;
  label: string;
}

interface SelectableTagListProps {
  options: Option[];
  selected: string[];
  onToggle: (id: string) => void;
}

export default function SelectableTagList({
  options,
  selected,
  onToggle,
}: SelectableTagListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <motion.button
            key={option.id}
            type="button"
            whileTap={{ scale: 0.95 }} // ← 押したときだけ沈む
            onClick={() => onToggle(option.id)}
            className={`relative p-3 text-xs font-semibold rounded-xl text-center tracking-wider transition-all
              ${isSelected
                ? 'bg-[#FFEE00] text-[#562305] shadow-md'
                : 'bg-white text-[#562305] border border-[#D4C8BB] hover:bg-[#F8F4F1]'}
            `}
          >
            {option.label}

            {isSelected && (
              <motion.span
                className="absolute top-1 right-1 text-xs"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                ✔️
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

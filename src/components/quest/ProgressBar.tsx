'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  from: string;
  to: string;
  percentage?: number; // 0〜100
}

export default function ProgressBar({ from, to, percentage = 45 }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, 200);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="bg-white space-y-2">
      <div className="relative h-5 bg-[#E9E4DC] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-yellow-300 to-[#FFA54A] rounded-full"
        />
      </div>

      <div className="flex justify-between text-xs font-semibold text-[#9F8372]">
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </div>
  );
}

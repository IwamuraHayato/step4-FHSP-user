'use client';

import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

interface QuestCardProps {
  familySteps: number;
  userSteps: number;
  userName: string;
  from: string;
  to: string;
  percentage?: number;
}

export default function QuestCard({
  familySteps,
  userSteps,
  userName,
  from,
  to,
  percentage = 60,
}: QuestCardProps) {
  const [displayedFamilySteps, setDisplayedFamilySteps] = useState(0);
  const [displayedUserSteps, setDisplayedUserSteps] = useState(0);

  // カウントアップのアニメーション
  useEffect(() => {
    let frame: number;
    let familyCurrent = 0;
    let userCurrent = 0;

    const step = () => {
      const increment = 200; // 数字の伸び幅（お好みで調整）
      let done = true;

      if (familyCurrent < familySteps) {
        familyCurrent += increment;
        if (familyCurrent > familySteps) familyCurrent = familySteps;
        setDisplayedFamilySteps(familyCurrent);
        done = false;
      }

      if (userCurrent < userSteps) {
        userCurrent += increment;
        if (userCurrent > userSteps) userCurrent = userSteps;
        setDisplayedUserSteps(userCurrent);
        done = false;
      }

      if (!done) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [familySteps, userSteps]);

  return (
    <div className="bg-white rounded-xl shadow-xl py-se-sm px-10 py-6 space-y-2 text-center text-[#562305]">

      {/* 家族歩数 */}
      <p className="text-xl font-bold text-slate-800">
        {displayedFamilySteps.toLocaleString()} <span className="text-base font-medium text-slate-800">歩</span>
      </p>

      {/* あなたの歩数 */}
      <p className="text-xs text-slate-800">
        {userName}の歩数: <span className="font-bold">{displayedUserSteps.toLocaleString()}</span> 歩
      </p>

      {/* 進捗バー */}
      <ProgressBar from={from} to={to} percentage={percentage} />
    </div>
  );
}

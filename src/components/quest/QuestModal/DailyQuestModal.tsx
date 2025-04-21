'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailyQuestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [rewarded, setRewarded] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const handleReward = () => {
    setRewarded(true);
    setShowRewardModal(true);
  };

  const closeRewardModal = () => {
    setShowRewardModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-end justify-center">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white w-full max-w-md rounded-t-2xl px-6 pt-6 pb-10 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#562305] hover:text-red-400"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center font-bold text-[#562305] mb-4 text-lg">デイリークエスト</h2>
        <hr className="border-[#E9E4DC] mb-4" />

        <div className="space-y-4">
          {/* ✅ ログインボーナスクエスト */}
          <div className="flex items-center justify-between bg-[#FFF4D6] p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Image src="/images/icons/icon_ichigo.png" alt="いちご" width={32} height={32} />
              <span className="text-[#562305] text-sm font-semibold">ログインボーナスをもらう</span>
            </div>
            {rewarded ? (
              <span className="text-xs text-white bg-[#D4C8BB] px-3 py-1 rounded-full">また明日</span>
            ) : (
              <button
                onClick={handleReward}
                className="text-xs text-white font-semibold bg-[#FFA54A] px-3 py-1 rounded-full shadow hover:opacity-80 transition"
              >
                獲得！
              </button>
            )}
          </div>

          {/* その他のクエストはダミー */}
          <div className="flex items-center justify-between bg-[#FFF4D6] p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Image src="/images/icons/icon_ichigo.png" alt="いちご" width={32} height={32} />
              <span className="text-[#562305] text-sm font-semibold">イベントページを開く</span>
            </div>
            <span className="text-xs text-white bg-[#D4C8BB] px-3 py-1 rounded-full">また明日</span>
          </div>
        </div>
      </motion.div>

      {/* ✅ ごほうびモーダル */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white p-6 rounded-xl text-center shadow-xl max-w-xs w-full"
            >
              <Image
                src="/images/icons/icon_amaou.png"
                alt="あまおうブースト"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <p className="text-[#562305] font-bold">あまおうブースト獲得！</p>
              <button
                onClick={closeRewardModal}
                className="mt-4 text-sm text-white bg-[#9F8372] px-4 py-1 rounded-full hover:bg-[#b79c8b]"
              >
                とじる
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

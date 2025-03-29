'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export default function HelloPage() {
  const router = useRouter();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: '#F0EDE3' }}
    >
      <AnimatePresence mode="wait" onExitComplete={() => router.push('/login')}>
        {show && (
          <motion.div
            key="hello"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            {/* テキストグループ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold tracking-wider mb-2" style={{ color: '#562305' }}>
                HAPPY
              </h1>

              <h1
                className="text-4xl font-bold tracking-wider mb-2 flex items-center gap-2"
                style={{ color: '#562305' }}
              >
                SMILE
                {/* ハートをSMILEの横に配置 */}
                <motion.div
                  initial={{ opacity: 0, rotate: 0, scale: 1 }}
                  animate={{ opacity: 1, rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 1,
                    duration: 1.2,
                    ease: 'easeInOut',
                  }}
                  className="w-8 h-8 relative"
                >
                  <Image
                    src="/images/heart.svg"
                    alt="heart icon"
                    width={32}
                    height={32}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </motion.div>
              </h1>

              <h1 className="text-4xl font-bold tracking-wider" style={{ color: '#562305' }}>
                PASSPORT
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

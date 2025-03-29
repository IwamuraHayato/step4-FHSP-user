'use client';

import './globals.css';
import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';

interface FloatingButtonProps {
  href: string;
  className?: string;
}

export default function FloatingButton({ href, className }: FloatingButtonProps) {
  return (
    <Link
      href={href}
      className={`fixed rounded-full bg-[#00B486] text-white text-xs font-bold flex items-center justify-center text-center shadow-lg z-50 right-4 ${className}`}
    >
      子ども向け画面<br />
      Kid’s<br />
      compass
    </Link>
  );
}

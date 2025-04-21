'use client';

import Link from 'next/link';

interface FloatingButtonProps {
  href: string;
  className?: string;
  disabled?: boolean;
}

export default function FloatingButton({
  href,
  className = '',
  disabled = false,
}: FloatingButtonProps) {
  const baseStyle = `
    fixed rounded-full bg-[#00B486] text-white text-xs font-bold 
    flex items-center justify-center text-center shadow-lg z-50 right-4 
    transition hover:opacity-80
    ${className}
  `;

  if (disabled) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={baseStyle}
        aria-disabled="true"
      >
        子ども向け画面<br />
        Kid’s<br />
        compass
      </button>
    );
  }

  return (
    <Link href={href} className={baseStyle}>
      子ども向け画面<br />
      Kid’s<br />
      compass
    </Link>
  );
}

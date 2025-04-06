'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-[#FFA54A] text-white font-bold'
              : 'bg-white text-[#9F8372] border border-[#D4C8BB] hover:bg-[#F0EDE3]'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

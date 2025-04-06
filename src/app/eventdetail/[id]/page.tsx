'use client';

import { useParams } from 'next/navigation';

export default function EventDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-xl font-bold text-[#562305]">イベント詳細ページ</h1>
      <p className="mt-4 text-[#9F8372]">イベントID: {id}</p>

      {/* 後でここに詳細データやレイアウトを追加します */}
    </div>
  );
}

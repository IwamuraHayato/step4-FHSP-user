'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthHeader from '@/components/common/AuthHeader';
import StepIndicator from '@/components/register/StepIndicator';
import SelectableTagList from '@/components/common/SelectableTagList';
// import { useSearchParams } from 'next/navigation';

export default function RegisterStep2() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);

  const interestOptions = [
    { id: 1, label: 'アクティブ' },
    { id: 2, label: 'スポーツ' },
    { id: 3, label: 'アウトドア' },
    { id: 4, label: 'ウォーキング' },
    { id: 5, label: '文化・歴史' },
    { id: 6, label: '伝統工芸' },
    { id: 7, label: '神社仏閣' },
    { id: 8, label: 'アート' },
    { id: 9, label: 'グルメ' },
    { id: 10, label: '食べ歩き' },
    { id: 11, label: 'カフェ巡り' },
    { id: 12, label: 'スイーツ' },
    { id: 13, label: '地域イベント' },
    { id: 14, label: 'エンタメ' },
    { id: 15, label: 'お祭り' },
    { id: 16, label: 'ライフイベント' },
    { id: 17, label: '学び・体験' },
    { id: 18, label: '社会貢献' },
    { id: 19, label: 'ボランティア' },
    { id: 20, label: '子育て支援' },
    { id: 21, label: '地域活性化' },
    { id: 22, label: 'エコ志向' },
    { id: 23, label: '健康志向' },
    { id: 24, label: 'デジタル' },
    { id: 25, label: 'のんびり派' },
    { id: 26, label: 'ライフスタイル' },
  ];

  const handleToggleInterest = (id: number) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

//  const handleNext = (e: React.FormEvent) => {
//    e.preventDefault();
//    router.push('/register/step3');
//  };

// const searchParams = useSearchParams();
// const userId = searchParams.get('user_id');
const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

const handleNext = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!userId) {
    alert("ユーザーIDが見つかりません。Step1からやり直してください。");
    return;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/register/step2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: Number(userId),
      tags: selectedInterests,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    // ✅ Step1でURLから取得したuser_idをlocalStorageに保存
    localStorage.setItem("user_id", String(userId));

    // ✅ Step3に遷移
    router.push(`/register/step3?user_id=${userId}`);
  } else {
    alert(data.detail || 'Step2の登録に失敗しました');
  }
};


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />
      <StepIndicator current={2} />

      <main className="flex-1 max-w-md w-full mx-auto mt-8 px-10 pb-20">
        {/* タイトル */}
        <h1 className="text-xl font-bold tracking-wider text-[#562305] mb-2">MYスタイル設定</h1>
        <p className="text-sm text-[#562305] mb-6 leading-relaxed">
          MYスタイルを設定すると、普段の暮らしにぴったりの情報や体験が見つかるようになります
        </p>

        <form onSubmit={handleNext} className="space-y-8">
          {/* 興味関心セクション */}
          <section className="w-full rounded-md bg-[#F0EDE3] py-6">
            <div className="max-w-md mx-auto px-4 space-y-4">
              <h2 className="text-sm font-bold text-[#562305]">興味・関心があること ＞</h2>
              <p className="text-xs text-[#562305]">
                あなたの興味・関心があるキーワードを選択してください
              </p>
              <SelectableTagList
                options={interestOptions}
                selected={selectedInterests}
                onToggle={handleToggleInterest}
              />
            </div>
          </section>

          {/* ボタン */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              type="submit"
              className="btn btn-block bg-[#FFA54A] hover:bg-[#FF8E1D] text-white tracking-wider"
            >
              次へ
            </button>
            <button
              type="button"
              className="btn btn-block btn-outline text-[#FFA54A] hover:bg-[#f7e1cb]"
              onClick={() => window.history.back()}
            >
              ＜ 戻る
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
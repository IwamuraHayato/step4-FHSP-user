'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/common/AuthHeader';
import StepIndicator from '@/components/register/StepIndicator';
import Link from 'next/link';

export default function RegisterStep4() {
  const router = useRouter();

  // ✅ userId を useState と useEffect で最初に定義しておく！
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user_id');
    if (stored) setUserId(Number(stored));
  }, []);

  const [nimocaId, setNimocaId] = useState(['', '', '', '']);
  const [gasCode, setGasCode] = useState('');
  const [nimocaLinked, setNimocaLinked] = useState(false);
  const [gasLinked, setGasLinked] = useState(false);

  const handleNimocaChange = (index: number, value: string) => {
    const newIds = [...nimocaId];
    newIds[index] = value;
    setNimocaId(newIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ userIdがnullかどうかをチェック！
    if (!userId) {
      alert('ユーザーIDが見つかりません。最初から登録し直してください。');
      return;
    }

  const nimocaFull = nimocaId.join('');
  const saibugasId = gasCode;

  try {
    const res = await fetch('http://localhost:8000/register/step4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        nimoca_id: nimocaFull,
        saibugas_id: saibugasId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Step4 登録成功:', data);
      router.push('/home');
    } else {
      console.error('❌ Step4 登録失敗:', data.detail);
    }
  } catch (err) {
    console.error('❌ 通信エラー:', err);
  }
};

  const inputClass =
    'input input-bordered w-full border-[#D4C8BB] placeholder-[#D4C8BB] focus:outline-none focus:ring-2 focus:ring-[#D4C8BB]';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />
      <StepIndicator current={4} />

      <main className="flex-1 max-w-md w-full mx-auto mt-6 px-10">
        <h1 className="text-lg font-bold tracking-wider text-[#562305] mb-4">
          ポイント連携
        </h1>

        {/* nimoca連携 */}
        <section className="mt-6 mb-12">
          <h2 className="bg-[#F0EDE3] text-[#562305] font-bold text-sm px-6 py-4 rounded">
            nimocaポイント連携
          </h2>
          <p className="text-sm text-[#562305] mt-4">
            HappySmileポイントに連携するnimocaカードの裏面記載の番号を入力してください
          </p>

          <div className="flex gap-2 mt-2">
            {nimocaId.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={4}
                value={val}
                onChange={(e) => handleNimocaChange(idx, e.target.value)}
                className="input input-bordered w-16 text-center border-[#D4C8BB]"
              />
            ))}
          </div>

          <p className="text-xs text-[#562305] mt-2 mb-4">
            nimocaポイント連携 利用規約は{' '}
            <Link href="#" className="text-blue-600 underline">
              こちら
            </Link>
          </p>

          <button
            type="button"
            className={`w-full py-2.5 rounded-3xl text-sm shadow-md font-bold text-[#562305] transition-all duration-300 ${
              nimocaLinked ? 'bg-[#FFEE00] text-[#562305] cursor-default' : 'bg-[#D4C8BB] hover:bg-[#C2B6A8]'
            }`}
            disabled={nimocaLinked}
            onClick={() => setNimocaLinked(true)}
          >
            {nimocaLinked ? 'ポイント連携完了' : '利用規約に同意して連携する'}
          </button>
        </section>

        {/* 西部ガスポイント連携 */}
        <section className="mb-8">
          <h2 className="bg-[#F0EDE3] text-[#562305] font-bold text-sm px-6 py-4 rounded">
            西部ガスポイント連携
          </h2>
          <p className="text-sm text-[#562305] mt-4">
            西部ガスからのご案内のために届いた連絡のお問い合わせ番号を入力してください
          </p>

          <input
            type="text"
            value={gasCode}
            onChange={(e) => setGasCode(e.target.value)}
            placeholder="例：12345678"
            className="mt-2 input input-bordered w-full border-[#D4C8BB]"
          />

          <p className="text-xs text-[#562305] mt-2 mb-4">
            西部ガスポイント連携 利用規約は{' '}
            <Link href="#" className="text-blue-600 underline">
              こちら
            </Link>
          </p>

          <button
            type="button"
            className={`w-full py-2.5 rounded-3xl text-sm shadow-md font-bold text-[#562305] transition-all duration-300 ${
              gasLinked ? 'bg-[#FFEE00] text-[#562305] cursor-default' : 'bg-[#D4C8BB] hover:bg-[#C2B6A8]'
            }`}
            disabled={gasLinked}
            onClick={() => setGasLinked(true)}
          >
            {gasLinked ? 'ポイント連携完了' : '利用規約に同意して連携する'}
          </button>
        </section>

        <button
          onClick={handleSubmit}
          className="btn btn-block bg-[#FFA54A] hover:bg-[#FF8E1D] text-white mt-4 mb-12"
        >
          ホーム画面へ
        </button>
      </main>
    </div>
  );
}

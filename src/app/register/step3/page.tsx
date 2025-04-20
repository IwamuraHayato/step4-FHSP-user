'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/common/AuthHeader';
import StepIndicator from '@/components/register/StepIndicator';

export default function RegisterStep3() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSendCode = async () => {
    if (!email.includes('@')) {
      setError('有効なメールアドレスを入力してください');
      return;
    }

    setError('');
    // 🚧 本番ではここでAPIと接続してメール送信
    console.log('📩 認証コードを送信:', email);
    setIsCodeSent(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // 🚧 本番ではAPIで認証コードを検証
    if (code === '123456') {
      setSuccess(true);
      router.push('/register/step3_success'); // ✅ 遷移先を変更
    } else {
      setError('認証コードが間違っています');
    }
  };

  const inputClass =
    'input input-bordered w-full border-[#D4C8BB] placeholder-[#D4C8BB] focus:outline-none focus:ring-2 focus:ring-[#D4C8BB]';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />
      <StepIndicator current={3} />

      <main className="flex-1 max-w-md w-full mx-auto mt-8 px-10">
        <h1 className="text-xl font-bold tracking-wider text-[#562305] mb-6">メール認証</h1>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* メールアドレス */}
          <div>
            <label className="block font-bold text-sm mb-1 text-[#562305]">メールアドレス</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          {!isCodeSent && (
            <button
              type="button"
              onClick={handleSendCode}
              className="btn btn-block bg-[#FFA54A] hover:bg-[#FF8E1D] text-white"
            >
              認証コードを送信
            </button>
          )}

          {/* 認証コード入力欄 */}
          {isCodeSent && (
            <>
              <div>
                <label className="block font-bold text-sm mb-1 text-[#562305]">認証コード</label>
                <input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="btn btn-block bg-[#FFA54A] hover:bg-[#FF8E1D] text-white"
              >
                認証して次へ
              </button>
            </>
          )}

          {/* エラー表示 */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </main>
    </div>
  );
}

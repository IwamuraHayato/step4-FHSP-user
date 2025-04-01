'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthHeader from '@/components/common/AuthHeader';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!email.includes('@')) {
      setError('有効なメールアドレスを入力してください');
      return;
    }

    setError('');
    // 🚧 本番ではここでAPI連携でメール送信
    console.log('📩 認証コードを送信:', email);
    setIsCodeSent(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (code === '123456') {
      router.push('/home'); // 🚧 認証成功時の処理
    } else {
      setError('認証コードが間違っています');
    }
  };

  const inputClass =
    'input input-bordered w-full border-[#D4C8BB] placeholder-[#D4C8BB] focus:outline-none focus:ring-2 focus:ring-[#D4C8BB]';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />

      <main className="flex-1 max-w-md w-full mx-auto mt-12 px-10 space-y-8">
        <h1 className="text-xl font-bold text-center tracking-wider mb-6 text-[#562305]">
          ログイン
        </h1>

        {/* メール認証フォーム */}
        <section className="border rounded-md p-8 border-[#D4C8BB] bg-white">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block font-bold text-sm mb-2 text-[#562305]">
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {!isCodeSent && (
              <button
                type="button"
                onClick={handleSendCode}
                className="btn btn-block tracking-wider bg-[#D4C4B5] hover:bg-[#C4B4A5] text-[#562305]"
              >
                ログイン
              </button>
            )}

            {isCodeSent && (
              <>
                <div>
                  <label className="block font-bold text-sm mb-2 text-[#562305]">
                    認証コード
                  </label>
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
                  className="btn btn-block tracking-wider bg-[#D4C4B5] hover:bg-[#C4B4A5] text-[#562305]"
                >
                  認証してログイン
                </button>
              </>
            )}

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </form>
        </section>

        {/* 新規登録エリア */}
        <section className="border rounded-md p-8 border-[#D4C8BB] bg-white">
          <h2 className="font-bold text-center tracking-wider mb-1 text-[#562305]">
            はじめてご利用の方
          </h2>
          <p className="text-xs text-center mb-4 text-[#562305]">
            (無料アカウントの作成)
          </p>
          <Link href="/register/step1" className="block">
            <button className="btn btn-block tracking-wider bg-[#D4C4B5] hover:bg-[#C4B4A5] text-[#562305] my-4">
              新規登録
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}

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

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/send-login-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('✅ 認証コード送信成功:', data);
        setIsCodeSent(true);
      } else {
        console.error('❌ 認証コード送信失敗:', data);
        setError(data.detail || 'コードの送信に失敗しました');
      }
    } catch (error) {
      console.error('❌ サーバー接続エラー:', error);
      setError('サーバーに接続できませんでした');
    }
  };


const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login-verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // 認証成功 → ホーム画面へ
      console.log("✅ ログイン成功:", data);
      // ✅ user_id を保存！（文字列化して保存します）
      localStorage.setItem("user_id", String(data.user_id));
      router.push('/home');
    } else {
      // 認証失敗 → エラーメッセージを表示
      console.error("❌ ログイン失敗:", data);
      setError(data.detail || 'ログインに失敗しました');
    }
  } catch (err) {
    setError('サーバーと接続できませんでした');
    console.error(err);
  }
};



  const inputClass =
    'input input-bordered w-full border-custom-beige placeholder-custom-beige focus:outline-none focus:ring-2 focus:ring-custom-beige';

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
                className="btn btn-block tracking-wider bg-custom-brown hover:bg-custom-hover-brown text-custom-dark-brown"
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

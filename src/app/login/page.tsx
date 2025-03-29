'use client';

import Link from 'next/link';
import AuthHeader from '@/components/common/AuthHeader';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />

      {/* Main Content */}
      <main className="flex-1 max-w-md w-full mx-auto mt-12 px-10 space-y-8">
        {/* タイトル */}
        <h1 className="text-xl font-bold text-center tracking-wider mb-6 text-[#562305]">
          ログイン
        </h1>

        {/* ログインフォーム */}
        <section className="border rounded-md p-8 border-[#D4C8BB] bg-white">
          <form className="space-y-8">
            {/* メールアドレス */}
            <div>
              <label
                htmlFor="email"
                className="block font-bold text-sm mb-2 text-[#562305]"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="input w-full border border-[#D4C8BB] focus:outline-none focus:ring-2 focus:ring-[#D4C8BB]"
              />
            </div>

            {/* パスワード */}
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-sm mb-2 text-[#562305]"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="input w-full border border-[#D4C8BB] focus:outline-none focus:ring-2 focus:ring-[#D4C8BB]"
              />
              <div className="text-center mt-1">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#562305] hover:underline"
                >
                  パスワードをお忘れの方はこちら
                </Link>
              </div>
            </div>

            {/* ログインボタン */}
            <button
              type="submit"
              className="btn btn-block tracking-wider bg-[#D4C4B5] hover:bg-[#C4B4A5] text-[#562305]"
            >
              ログイン
            </button>
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

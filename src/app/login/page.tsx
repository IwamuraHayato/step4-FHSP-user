'use client';

import Link from 'next/link';
import AuthHeader from "@/components/common/AuthHeader";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />

      {/* Main Content */}
      <main className="flex-1 max-w-md w-full mx-auto mt-12 px-4 space-y-8">
      <h1 className="text-xl font-bold text-center mb-6 text-[#562305]">ログイン</h1>
        {/* Login Form */}
        <section className="border rounded-lg p-6 shadow-sm bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-[#562305]">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-[#562305]">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="input input-bordered w-full"
              />
              <div className="text-right mt-1">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:underline"
                >
                  パスワードをお忘れの方はこちら
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="btn w-full bg-[#D4C4B5] hover:bg-[#C4B4A5] text-black"
            >
              ログイン
            </button>
          </form>
        </section>

        {/* Registration Section */}
        <section className="border rounded-lg p-6 shadow-sm bg-white">
          <h2 className="text-center mb-1 text-[#562305]">はじめてご利用の方</h2>
          <p className="text-sm text-center text-gray-500 mb-4">(無料アカウントの作成)</p>
          <Link href="/register" className="block">
            <button className="btn btn-outline w-full bg-[#D4C4B5] hover:bg-[#C4B4A5] text-black">
              新規登録
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}

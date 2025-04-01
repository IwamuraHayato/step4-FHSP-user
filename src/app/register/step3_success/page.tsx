'use client';

import { useRouter } from 'next/navigation';
import AuthHeader from '@/components/common/AuthHeader';
import StepIndicator from '@/components/register/StepIndicator';

export default function RegisterStep3Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />
      <StepIndicator current={3} />

      <main className="flex-1 max-w-md w-full mx-auto mt-10 px-10 text-center">
        <h1 className="text-lg font-bold text-[#562305] mb-6">アカウント登録が完了しました</h1>

        {/* テキスト説明部分：左寄せ & 段落分け */}
        <div className="text-sm text-[#562305] leading-relaxed mb-8 text-left space-y-2">
          <p>続けて、nimocaポイントや西部ガスポイントをHappy Smileポイントに連携する手続きを行います。
          </p>
          <p>※ポイント連携は後からでも行うことができます。</p>
        </div>

        {/* ボタン2つ */}
        <div className="flex flex-col gap-4">
          <button
            className="btn btn-block tracking-wider bg-[#FFA54A] hover:bg-[#FF8E1D] text-white"
            onClick={() => router.push('/register/step4')}
          >
            ポイント連携の登録を行う ＞
          </button>

          <button
            className="btn btn-block btn-outline text-[#FFA54A] hover:bg-[#f7e1cb]"
            onClick={() => router.push('/home')}
          >
            今はしない
          </button>
        </div>
      </main>
    </div>
  );
}

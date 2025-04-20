'use client';

import { useState } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AuthHeader from '@/components/common/AuthHeader';
import StepIndicator from '@/components/register/StepIndicator';

export default function RegisterStep1() {
  const router = useRouter();

  const [zipcode, setZipcode] = useState('');
  const [address1, setAddress1] = useState('');

//  const handleNext = (e: React.FormEvent) => {
//    e.preventDefault();
//    router.push('/register/step2?user_id=${userId}');
//  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    // ↓↓↓ 入力値を取得
    const name = (document.querySelector('input[placeholder="山田 太郎"]') as HTMLInputElement)?.value || "";
    const name_kana = (document.querySelector('input[placeholder="ヤマダ タロウ"]') as HTMLInputElement)?.value || "";
    const gender = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || "U";
    const birth_date = (document.querySelector('input[type="date"]') as HTMLInputElement)?.value || "";
    const address2 = (document.querySelector('input[placeholder="番地・建物名"]') as HTMLInputElement)?.value || "";

    // メールは将来的にログインと合わせる想定ですが、仮で固定値にしてもOK
    const email = "test@example.com";

    const res = await fetch("http://localhost:8000/register/step1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        name_kana,
        gender,
        birth_date,
        postal_code: zipcode,
        address1,
        address2,
        email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      const userId = data.user_id;

       // ✅ ここで localStorage に保存！
      localStorage.setItem("user_id", String(userId));
      
      router.push(`/register/step2?user_id=${userId}`);
    } else {
      alert(data.detail || "Step1の登録に失敗しました");
    }
  };


  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.replace(/[^0-9]/g, '');
    setZipcode(zip);

    if (zip.length === 7) {
      try {
        const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
        const data = await res.json();

        if (data.results && data.results[0]) {
          const result = data.results[0];
          const fullAddress = `${result.address1}${result.address2}${result.address3}`;
          setAddress1(fullAddress);
        } else {
          setAddress1('住所が見つかりませんでした');
        }
      } catch (err) {
        console.error('住所取得エラー:', err);
        setAddress1('住所取得エラー');
      }
    } else {
      setAddress1('');
    }
  };

  // 共通クラス（input）
  const inputClass =
    'input input-bordered w-full border-[#D4C8BB] placeholder-[#D4C8BB] focus:outline-none focus:ring-2 focus:ring-[#D4C8BB]';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AuthHeader />
      <StepIndicator current={1} />

      <main className="flex-1 max-w-md w-full mx-auto mt-8 px-10">
        <h1 className="text-xl font-bold tracking-wider text-[#562305] mb-8">基本情報</h1>

        <form onSubmit={handleNext} className="space-y-8">
          {/* 名前 */}
          <div>
            <label className="block font-bold text-sm mb-1 text-[#562305]">氏名（漢字）</label>
            <input type="text" placeholder="山田 太郎" className={inputClass} />
          </div>
          <div>
            <label className="block font-bold text-sm mb-1 text-[#562305]">氏名（カタカナ）</label>
            <input type="text" placeholder="ヤマダ タロウ" className={inputClass} />
          </div>

          {/* 性別 */}
          <div>
            <label className="block font-bold text-sm mb-2 text-[#562305]">性別</label>
            <div className="flex gap-4 mt-1">
              <label className="label cursor-pointer space-x-2">
                <input type="radio" name="gender" className="radio" value="M" defaultChecked />
                <span className="label-text text-[#562305]">男性</span>
              </label>
              <label className="label cursor-pointer space-x-2">
                <input type="radio" name="gender" className="radio" value="F" />
                <span className="label-text text-[#562305]">女性</span>
              </label>
              <label className="label cursor-pointer space-x-2">
                <input type="radio" name="gender" className="radio" value="U" />
                <span className="label-text text-[#562305]">回答しない</span>
              </label>
            </div>
          </div>

          {/* 生年月日 */}
          <div>
            <label className="block font-bold text-sm mb-1 text-[#562305]">生年月日</label>
            <input type="date" className={inputClass} />
          </div>

          {/* 郵便番号 */}
          <div>
            <label className="block font-bold text-sm mb-1 text-[#562305]">郵便番号</label>
            <input
              type="text"
              placeholder="1234567"
              value={zipcode}
              onChange={handleZipChange}
              className={inputClass}
            />
          </div>

          {/* 住所1（自動入力） */}
          <div>
            <label className="block font-bold text-sm mb-1 text-[#562305]">住所1</label>
            <input
              type="text"
              placeholder="都道府県・市区町村"
              value={address1}
              readOnly
              className={`${inputClass} bg-[#EDEAE7]`}
            />
          </div>

          {/* 住所2 */}
          <div>
            <label className="block font-bold text-sm mb-1 text-[#562305]">住所2</label>
            <input
              type="text"
              placeholder="番地・建物名"
              className={inputClass}
            />
          </div>

          {/* ボタン */}
          <div className="flex flex-col gap-4 pt-4 pb-20">
            <button
              type="submit"
              className="btn btn-block tracking-wider bg-[#FFA54A] hover:bg-[#FF8E1D] text-white"
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

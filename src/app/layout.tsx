import './globals.css';

export const metadata = {
  title: 'Happy Smile Passport',
  description: 'ログイン・新規登録 UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="font-sans text-brown">
        {children}
      </body>
    </html>
  );
}

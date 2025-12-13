import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';
import EmotionProvider from '@/shared/providers/EmotionProvider';
import QueryClientProvider from '@/shared/providers/QueryClientProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'F-Lab 과제 프로젝트',
  description: '페이지네이션, 무한스크롤, 검색 등 다양한 피쳐를 구현한 과제 프로젝트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryClientProvider>
          <EmotionProvider>{children}</EmotionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

import '@/_styles/globals.css';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Taskify - 새로운 일정 관리',
  description:
    '일정 관리와 공유 기능을 제공하여 다양한 커뮤니티를 생성하고, 멤버를 초대하여 일정과 할 일 목록을 함께 관리',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="ko">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{metadata.title}</title>
          <link
            rel="preconnect"
            href="https://cdn.jsdelivr.net"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="style"
            crossOrigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
          />
          <link rel="icon" href="/images/icon/favicon.ico" />
        </head>
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}

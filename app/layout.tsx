import '@/_styles/globals.css';

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
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <link rel="icon" href="/images/icon/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}

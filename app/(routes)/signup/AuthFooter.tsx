import Link from 'next/link';

const DESTINATION = {
  signin: {
    description: '이미 회원이신가요?',
    link: '로그인하기',
    href: '/login',
  },
  signup: {
    description: '회원이 아니신가요요?',
    link: '회원가입하기',
    href: '/signup',
  },
};

export default function AuthFooter({ to }: { to: 'signup' | 'signin' }) {
  return (
    <footer className="select-none text-center">
      <span>{DESTINATION[to].description}&nbsp;</span>
      <Link
        className="text-violet-5534DA underline"
        href={DESTINATION[to].href}
      >
        {DESTINATION[to].link}
      </Link>
    </footer>
  );
}

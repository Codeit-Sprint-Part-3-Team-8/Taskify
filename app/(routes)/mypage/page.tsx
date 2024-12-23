'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import Image from 'next/image';

export default function MyPage() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-F5F5F5">
      <div className="flex flex-col gap-6 p-6">
        <Link
          href="/mydashboard"
          className="flex w-fit items-center justify-center gap-2"
        >
          <div className="relative h-4 w-4 tablet:h-6 tablet:w-6">
            <Image fill src="/images/icon/icon_arrow.svg" alt="돌아가기" />
          </div>
          <span className="text-sm tablet:text-lg">돌아가기</span>
        </Link>
        <ProfileForm
          email={user?.email as string}
          nickname={user?.nickname as string}
        />
        <PasswordForm />
      </div>
    </div>
  );
}

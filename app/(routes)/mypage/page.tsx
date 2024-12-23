'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';

export default function MyPage() {
  const { user } = useAuth();

  return (
    <div>
      <Link href="/mydashboard">돌아가기</Link>

      <ProfileForm
        email={user?.email as string}
        nickname={user?.nickname as string}
      />

      <PasswordForm />
    </div>
  );
}

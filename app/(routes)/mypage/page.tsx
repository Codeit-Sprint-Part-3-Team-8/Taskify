'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import Image from 'next/image';
import MyDashboardNavBar from '@/_components/Navbar/MyDashboardNavBar';
import SideBar from '@/_components/Sidebar/SideBar';
import Container from '@/_components/layout/Container';

export default function MyPage() {
  const { user, update } = useAuth(true);

  return (
    <>
      <SideBar />
      <MyDashboardNavBar title="계정관리" />
      <Container className="flex flex-col gap-6 p-6">
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
          profileImageUrl={user?.profileImageUrl as string | null}
          update={update}
        />
        <PasswordForm update={update} />
      </Container>
    </>
  );
}

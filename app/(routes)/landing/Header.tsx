'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@images/icon/logo.svg';
import taskify from '@images/contents/taskify.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="px-6 py-4 tablet:px-10 pc:px-20">
      <div className="flex max-w-[1760px] justify-between">
        <div className="flex items-center" onClick={() => router.push('/')}>
          <Image src={logo} width={35} height={35} alt="Taskify 로고" />
          <Image src={taskify} width={80} height={22} alt="Taskify 로고" />
        </div>
        <div className="flex items-center gap-9">
          <Link href="/login">
            <div className="cursor-pointer text-lg font-normal text-white">
              로그인
            </div>
          </Link>
          <Link href="/login">
            <div className="cursor-pointer text-lg font-normal text-white">
              회원가입
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

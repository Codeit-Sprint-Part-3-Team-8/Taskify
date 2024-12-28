'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@images/icon/logo.svg';
import taskify from '@images/contents/taskify.png';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-[1000] bg-black-000000 px-6 py-4 tablet:px-10 pc:px-20">
      <div className="flex max-w-[1760px] justify-between">
        <Link href="/" className="flex items-center">
          <Image src={logo} width={35} height={35} alt="Taskify 로고" />
          <Image src={taskify} width={80} height={22} alt="Taskify 로고" />
        </Link>
        <div className="flex items-center gap-9">
          <Link href="/login">
            <div className="cursor-pointer text-lg font-medium text-white">
              로그인
            </div>
          </Link>
          <Link href="/signup">
            <div className="cursor-pointer text-lg font-medium text-white">
              회원가입
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

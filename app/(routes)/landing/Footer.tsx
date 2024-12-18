import React from 'react';
import IconMail from '@images/icon/mail.svg';
import IconFacebook from '@images/icon/facebook.svg';
import IconInstagram from '@images/icon/Instagram.svg';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex h-24 flex-col items-center justify-between tablet:flex tablet:flex-row tablet:px-36">
      <div className="text-1 flex items-center font-normal text-gray-9FA6B2">
        @codeit - 2024
      </div>
      <div className="text-1 flex items-center gap-8 font-normal text-gray-9FA6B2">
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div className="flex items-center gap-3 pt-16 tablet:pt-0">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.gmail.com"
        >
          <Image src={IconMail} width={20} height={15} alt="메일이동하기" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com"
        >
          <Image
            src={IconFacebook}
            width={20}
            height={15}
            alt="페이스북이동하기"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com"
        >
          <Image
            src={IconInstagram}
            width={20}
            height={15}
            alt="인스타그램이동하기"
          />
        </a>
      </div>
    </footer>
  );
}

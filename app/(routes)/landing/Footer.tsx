import React from 'react';
import IconMail from '@images/icon/mail.svg';
import IconFacebook from '@images/icon/facebook.svg';
import IconInstagram from '@images/icon/Instagram.svg';
import Image from 'next/image';

const socialLinks = [
  {
    href: 'https://www.gmail.com',
    src: IconMail,
    alt: '메일이동하기',
  },
  {
    href: 'https://www.facebook.com',
    src: IconFacebook,
    alt: '페이스북이동하기',
  },
  {
    href: 'https://www.instagram.com',
    src: IconInstagram,
    alt: '인스타그램이동하기',
  },
];

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'FAQ', href: '/faq' },
];

export default function Footer() {
  return (
    <footer className="flex h-24 flex-col items-center justify-between tablet:flex tablet:flex-row tablet:px-36">
      <div className="text-1 flex items-center font-normal text-gray-9FA6B2">
        @codeit - 2024
      </div>
      <div className="text-1 flex items-center gap-8 font-normal text-gray-9FA6B2">
        <ul className="flex gap-8">
          {footerLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="hover:text-blue-500">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-3 pt-16 tablet:pt-0">
        {socialLinks.map(({ href, src, alt }) => (
          <a key={href} target="_blank" rel="noopener noreferrer" href={href}>
            <Image src={src} width={16} height={16} alt={alt} />
          </a>
        ))}
      </div>
    </footer>
  );
}

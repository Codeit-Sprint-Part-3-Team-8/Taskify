import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
}

export default function ContentBox({
  title,
  description,
  imageSrc,
  imageAlt,
}: CardProps) {
  return (
    <div className="w-[21rem] tablet:w-96 pc:w-[24rem]">
      <div className="flex h-64 items-center justify-center bg-black-4B4B4B">
        <div className="relative w-64">
          <Image src={imageSrc} alt={imageAlt} width={300} height={230} />
        </div>
      </div>
      <div className="flex h-[7.7rem] flex-col justify-center gap-5 bg-black-171717 pl-8">
        <div className="text-[1.12rem] font-bold text-white">{title}</div>
        <div className="text-[1.12rem] font-medium text-white">
          {description}
        </div>
      </div>
    </div>
  );
}

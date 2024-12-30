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
    <div className="w-[24rem] tablet:w-96 pc:w-[24rem]">
      <div className="flex h-80 items-center justify-center bg-black-4B4B4B pc:h-64">
        <div className="relative w-[19rem] pc:w-64">
          <Image src={imageSrc} alt={imageAlt} width={300} height={230} />
        </div>
      </div>
      <div className="flex h-[7.7rem] flex-col items-center justify-center gap-5 bg-black-171717 pc:items-start pc:pl-8">
        <div className="text-[1.2rem] font-bold text-white">{title}</div>
        <div className="text-[1.2rem] font-medium text-white">
          {description}
        </div>
      </div>
    </div>
  );
}

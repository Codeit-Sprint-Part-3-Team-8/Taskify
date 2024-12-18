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
    <div>
      <div className="flex h-64 w-96 items-center justify-center bg-black-4B4B4B">
        <Image src={imageSrc} alt={imageAlt} width={300} height={230} />
      </div>
      <div className="flex h-[7.7rem] w-96 flex-col justify-center gap-5 bg-black-171717 pl-8">
        <div className="text-[1.12rem] font-bold text-white">{title}</div>
        <div className="text-[1.12rem] font-medium text-white">
          {description}
        </div>
      </div>
    </div>
  );
}

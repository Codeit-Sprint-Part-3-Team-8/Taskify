'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import iconCheck from '@images/icon/icon_check.svg';
const color = [
  'bg-green-7AC555',
  'bg-purple-760DDE',
  'bg-orange-FFA500',
  'bg-blue-76A5EA',
  'bg-pink-E876EA',
];
interface ColorSelectBoxProps {
  onChangeColor: (color: string) => void;
  usedColor: string;
}

export default function ColorSelectBox({
  onChangeColor,
  usedColor,
}: ColorSelectBoxProps) {
  const [selectedColor, setSelectedColor] = useState<string>(usedColor);

  const handleColorChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const clickedColor = e.currentTarget.classList[0].split('-')[2];
    const color = `#${clickedColor}`;
    setSelectedColor(color);
    onChangeColor(color);
  };

  return (
    <div className="flex gap-2">
      {color.map((data, index) => {
        const clickedColor = `#${data.split('-')[2]}`;
        return (
          <div
            onClick={handleColorChange}
            className={`${data} relative h-[1.8rem] w-[1.8rem] gap-2 rounded-2xl`}
            key={index}
          >
            {selectedColor === clickedColor && (
              <Image
                src={iconCheck}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                width={28}
                height={28}
                alt="체크"
              ></Image>
            )}
          </div>
        );
      })}
    </div>
  );
}

'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CheckIcon from '@images/icon/icon_check.svg';
interface ColorOption {
  label: string;
  value: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { label: 'green', value: '#7ac555' },
  { label: 'purple', value: '#760dde' },
  { label: 'orange', value: '#ffa500' },
  { label: 'lightblue', value: '#76a5ea' },
  { label: 'pink', value: '#e876ea' },
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
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onChangeColor(color);
  };

  useEffect(() => {
    setSelectedColor(usedColor);
  }, [usedColor]);

  return (
    <div className="flex gap-2">
      {COLOR_OPTIONS.map((color, index) => {
        return (
          <button
            key={index}
            type="button"
            className="focus:ring-primary flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => handleColorChange(color.value)}
            style={{ backgroundColor: color.value }}
            aria-label={`${color.label} 색상 선택`}
          >
            {selectedColor === color.value && (
              <Image src={CheckIcon} alt="선택된 색상" width={20} height={20} />
            )}
          </button>
        );
      })}
    </div>
  );
}

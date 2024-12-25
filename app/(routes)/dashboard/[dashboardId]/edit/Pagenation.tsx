import Image from 'next/image';
import React from 'react';
import iconArrow from '@images/icon/icon_arrow.svg';

const PAGE_SIZE = 5;

interface PagenationProps {
  onClickPage: (page: number) => void;
  totalCount: number | undefined;
  pageSize: number;
}

export default function Pagenation({
  onClickPage,
  totalCount,
  pageSize = PAGE_SIZE,
}: PagenationProps) {
  const [page, setPage] = React.useState(1);
  const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 0;

  const handleClickPage = (increment: number) => {
    const newPage = page + increment;

    if (newPage >= 1) {
      setPage(newPage);
      onClickPage(newPage);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        {totalPages} 페이지 중 {page}
      </div>
      <div className="flex">
        <button
          onClick={() => handleClickPage(-1)}
          className={`w-9 rounded-bl-[0.6rem] rounded-tl-[0.6rem] border border-gray-D9D9D9 p-[0.6rem] ${page === 1 && 'cursor-not-allowed text-gray-400 opacity-50'}`}
          disabled={page === 1}
        >
          <Image
            src={iconArrow}
            className="text-gray-D9D9D9"
            alt="돌아가기"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => handleClickPage(1)}
          className={`w-9 scale-x-[-1] transform rounded-bl-[0.6rem] rounded-tl-[0.6rem] border border-gray-D9D9D9 p-[0.6rem] ${totalPages === page && 'cursor-not-allowed text-gray-400 opacity-50'}`}
          disabled={totalPages === page}
        >
          <Image
            src={iconArrow}
            className="text-gray-D9D9D9"
            alt="돌아가기"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}

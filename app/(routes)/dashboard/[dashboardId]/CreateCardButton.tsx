import Image from 'next/image';
import { ColumnData } from './Dashboard';

export default function CreateCardButton({
  onClick,
  id,
  title,
}: {
  onClick: ({ id, title }: ColumnData) => void;
  id: number;
  title: string;
}) {
  const handleClick = () => {
    onClick({ id, title });
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-8 w-full transform cursor-pointer items-center justify-center rounded-md border border-gray-300 px-20 py-1.5 transition-transform hover:scale-105 hover:bg-purple-100 tablet:h-10 tablet:py-2"
    >
      <div className="relative h-5 w-5 tablet:h-[22px] tablet:w-[22px]">
        <Image
          src="/images/icon/ic-plusbtn-purple.svg"
          alt="카드 생성 버튼"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

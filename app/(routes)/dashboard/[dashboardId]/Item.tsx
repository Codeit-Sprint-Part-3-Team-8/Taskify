import Profile from '@/_components/Navbar/Profile';
import { CardType } from '@/_types/cards.type';
import Image from 'next/image';

interface ItemsProps {
  item: CardType;
  dragOverlay?: boolean;
}

export function Item({ item, dragOverlay }: ItemsProps) {
  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }

  return (
    <div
      className={`item h-full max-h-full w-full ${dragOverlay ? 'cursor-grabbing' : 'cursor-grab'} gap-5 rounded-md border-2 border-gray-200 bg-gray-50 px-3 pt-3 tablet:flex tablet:items-center tablet:pt-0 ${item.imageUrl ? 'pc:h-[304px] pc:w-[314px]' : 'pc:fit pc:w-[314px]'} transform transition-transform hover:scale-105 hover:bg-blue-50 pc:flex-col pc:gap-4 pc:py-3`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-md mobile:h-[152px] tablet:h-[54px] tablet:w-[90px] ${item.imageUrl ? 'pc:h-full pc:w-full' : 'tablet:hidden pc:hidden'}`}
      >
        <Image
          src={item.imageUrl || '/images/contents/default-preview-card.svg'}
          alt="할 일 카드 미리보기"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full space-y-2 pt-1 tablet:flex tablet:gap-2 tablet:pt-0 pc:flex-col pc:pt-1">
        <div className="space-y-2.5 tablet:justify-between">
          <p className="text-nowrap text-md font-medium text-black-333236 tablet:text-lg">
            {item.title}
          </p>
          <div className="flex flex-wrap gap-1 space-x-1">
            {item.tags.map((tag) => (
              <div
                className="h-6 w-fit truncate rounded-xl bg-gray-200 px-1"
                key={tag}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between tablet:w-full tablet:items-end tablet:pb-0.5 pc:items-center">
          <div className="flex items-center gap-1.5 tablet:items-end pc:items-center">
            <div className="relative h-4 w-4 tablet:h-[18px] tablet:w-[18px]">
              <Image
                src={'/images/icon/ic-calendar.svg'}
                alt="달력 아이콘"
                fill
                className="object-cover"
              />
            </div>
            <p className="pt-0.5 text-xs text-gray-787486">
              {formatDate(item.createdAt)}
            </p>
          </div>
          <div className="flex items-center justify-between tablet:items-end pc:items-center">
            <Profile
              profileImageUrl={item.assignee.profileImageUrl || undefined}
              nickname={item.assignee.nickname}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

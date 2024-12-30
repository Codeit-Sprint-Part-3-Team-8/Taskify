import UserProfile from '@/_components/UserProfile/UserProfile';
import { CardType } from '@/_types/cards.type';
import Image from 'next/image';

interface ModalContentProps {
  card: CardType | null;
  columnTitle: string;
}

export default function ModalContent({ card, columnTitle }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-4 tablet:flex-row-reverse">
      <div className="flex h-fit items-center justify-between gap-4 rounded-xl border border-gray-D9D9D9 px-4 py-[0.375rem] tablet:w-40 tablet:flex-col tablet:items-start tablet:px-4 tablet:py-3">
        <div className="flex h-[2.875rem] grow flex-col justify-between">
          <label className="text-black-323236 text-xs font-semibold">
            담당자
          </label>
          <div className="flex items-center gap-2">
            <UserProfile
              profileImageUrl={card?.assignee?.profileImageUrl}
              onlyImg
              nickname={card?.assignee?.nickname || ''}
            />
            <span className="text-xs font-normal">
              {card?.assignee?.nickname || ''}
            </span>
          </div>
        </div>
        <div className="flex h-[2.875rem] grow flex-col justify-between">
          <label className="text-black-323236 text-xs font-semibold">
            마감일
          </label>
          <div className="text-xs font-normal">{card?.dueDate}</div>
        </div>
      </div>

      <div className="grow">
        <div className="mb-4 flex h-[26px] w-full items-center gap-2">
          <div className="flex h-full w-16 items-center gap-1 rounded-full bg-violet-8">
            <span className="ml-[6px] text-3xl text-violet-5534DA">•</span>
            <span className="mt-1 text-xs text-violet-5534DA">
              {columnTitle}
            </span>
          </div>
          <div className="flex h-full gap-2">
            {card?.tags.map((tag) => (
              <span
                key={tag}
                className="h-full rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 h-[272px]">
          <p className="mb-8 text-xs font-normal text-black-000000">
            {card?.description}
          </p>
          {card?.imageUrl && (
            <Image
              src={card.imageUrl}
              alt="Task illustration"
              className="mb-6 h-auto w-full rounded-lg object-contain"
              width={290}
              height={168}
            />
          )}
        </div>
      </div>
    </div>
  );
}

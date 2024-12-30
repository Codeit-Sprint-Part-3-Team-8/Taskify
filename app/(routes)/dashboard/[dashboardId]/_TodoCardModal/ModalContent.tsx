import { CardType } from '@/_types/cards.type';
import Image from 'next/image';

interface ModalContentProps {
  card: CardType | null;
  columnTitle: string;
}

export default function ModalContent({ card, columnTitle }: ModalContentProps) {
  return (
    <div className="grow">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex h-[26px] max-w-40 items-center gap-1 rounded-full bg-violet-8 pr-2">
          <span className="ml-[6px] text-3xl text-violet-5534DA">•</span>
          <span className="mt-1 truncate whitespace-nowrap text-xs text-violet-5534DA">
            {columnTitle}
          </span>
        </div>
        {card?.tags.map((tag) => (
          <span
            key={tag}
            className="h-[26px] max-w-20 truncate whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-6 h-[272px]">
        <p className="mb-8 text-xs font-normal text-black-000000">
          {card?.description}
        </p>
        {card?.imageUrl && (
          <div className="relative mb-6 h-[10.5rem] w-[18.125rem] rounded-lg tablet:h-[15.375rem] tablet:w-[26.25rem] pc:h-[16.25rem] pc:w-[27.81375rem]">
            <Image
              src={card.imageUrl}
              alt="Task illustration"
              className="object-contain"
              fill
            />
          </div>
        )}
      </div>
    </div>
  );
}

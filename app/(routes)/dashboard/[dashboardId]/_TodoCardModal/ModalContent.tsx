import { CardType } from '@/_types/cards.type';
import Image from 'next/image';

interface ModalContentProps {
  card: CardType | null;
}

export default function ModalContent({ card }: ModalContentProps) {
  return (
    <div className="overtext-xs break-words font-normal text-black-000000">
      {card?.description}
      {card?.imageUrl && (
        <div className="relative mb-4 mt-4 h-[10.5rem] w-[18.125rem] rounded-lg tablet:h-[15.375rem] tablet:w-[26.25rem] pc:h-[16.25rem] pc:w-[27.81375rem]">
          <Image
            src={card.imageUrl}
            alt="Task illustration"
            className="object-contain"
            fill
          />
        </div>
      )}
    </div>
  );
}

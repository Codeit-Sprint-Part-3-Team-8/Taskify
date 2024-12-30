import UserProfile from '@/_components/UserProfile/UserProfile';
import { CardType } from '@/_types/cards.type';

interface ModalInfoProps {
  card: CardType;
}

export default function ModalInfo({ card }: ModalInfoProps) {
  return (
    <div className="flex h-fit items-center justify-between gap-4 rounded-xl border border-gray-D9D9D9 px-4 py-[0.375rem] tablet:w-48 tablet:flex-col tablet:items-start tablet:px-4 tablet:py-3">
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
  );
}

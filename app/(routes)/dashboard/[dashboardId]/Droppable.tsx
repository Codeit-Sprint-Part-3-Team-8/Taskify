import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';
import { CardType } from '@/_types/cards.type';
import CreateCardButton from './CreateCardButton';
import Image from 'next/image';

interface DroppableProps {
  id: string;
  dashBoardColor: string;
  title: string;
  items: CardType[];
}

export default function Droppable({
  id,
  dashBoardColor,
  items,
  title,
}: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div className="px-3 py-4 mobile:w-full pc:max-w-[384px]">
        <div className="border-b-2 pb-2 tablet:pb-6 pc:border-none">
          <div className="flex justify-between pb-1">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="sh h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: dashBoardColor }}
              />
              <div className="flex items-center gap-4">
                <p className="text-nowrap text-lg font-bold tablet:text-2lg">
                  {title}
                </p>
                <p className="flex h-5 w-5 items-center justify-center rounded-md bg-gray-EEEEEE px-1.5 py-1 text-xs text-gray-787486">
                  {items.length}
                </p>
              </div>
            </div>
            <div className="relative h-5 w-5 tablet:h-[24px] tablet:w-[24px]">
              <Image
                src="/images/icon/ic-setting.svg"
                alt="컬럼 수정 버튼"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <CreateCardButton />
          <ul
            ref={setNodeRef}
            className="tablet:scrollbar-hidden grid w-full grid-flow-col rounded-lg px-3 py-4 pb-8 mobile:gap-8 mobile:overflow-x-auto tablet:max-h-[220px] tablet:grid-flow-row tablet:gap-4 tablet:overflow-y-auto pc:h-full pc:max-h-full pc:gap-16"
          >
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </SortableContext>
  );
}

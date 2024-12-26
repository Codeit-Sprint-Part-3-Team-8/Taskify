import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';
import { CardType } from '@/_types/cards.type';

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
      <div className="max-w-[384px] px-3 py-4">
        <div className="border-b-2 pb-2 tablet:pb-6 pc:border-none">
          <div className="flex items-center gap-2">
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
          <ul
            ref={setNodeRef}
            className="scrollbar-hidden grid w-full auto-cols-[90%] grid-flow-col rounded-lg px-3 py-4 mobile:gap-14 mobile:overflow-x-auto tablet:max-h-[200px] tablet:grid-flow-row tablet:gap-4 tablet:overflow-y-auto pc:h-full pc:max-h-full"
          >
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} />
            ))}
          </ul>
        </div>
      </div>
    </SortableContext>
  );
}

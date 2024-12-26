import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';
import { CardType } from '@/_types/cards.type';

interface DroppableProps {
  id: string;
  title: string;
  items: CardType[];
}

export default function Droppable({ id, items, title }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div>
        <p className="mb-4 text-lg font-bold">{title}</p>
        <ul
          ref={setNodeRef}
          className="scrollbar-stable grid w-full auto-cols-[90%] grid-flow-col rounded-lg p-4 mobile:gap-14 mobile:overflow-x-auto tablet:max-h-[200px] tablet:grid-flow-row tablet:gap-4 tablet:overflow-y-auto pc:max-h-full"
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} />
          ))}
        </ul>
      </div>
    </SortableContext>
  );
}

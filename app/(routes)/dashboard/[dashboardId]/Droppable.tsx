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
      <ul className="flex-col space-y-2" ref={setNodeRef}>
        <p>{title}</p>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} />
        ))}
      </ul>
    </SortableContext>
  );
}

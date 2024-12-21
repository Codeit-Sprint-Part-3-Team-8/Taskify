import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';
import { CardType } from './Dashboard';

interface DroppableProps {
  id: string;
  title: string;
  items: CardType[];
}

export default function Droppable({ id, items, title }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <>
      {/* 현재 카드 데이터가 없어서 임시로 title 출력 */}
      <p>{title}</p>

      {items.length > 0 && (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
          <p>{title}</p>
          <ul className="flex-col space-y-2" ref={setNodeRef}>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} />
            ))}
          </ul>
        </SortableContext>
      )}
    </>
  );
}

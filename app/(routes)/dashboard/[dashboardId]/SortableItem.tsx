import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';
import { UniqueIdentifier } from '@dnd-kit/core';

export default function SortableItem({ id }: { id: UniqueIdentifier }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  return (
    <li
      className={`w-full transform transition-all ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        transform: transform ? CSS.Transform.toString(transform) : undefined,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Item id={id} />
    </li>
  );
}

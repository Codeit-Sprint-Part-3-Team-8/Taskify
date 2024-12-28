import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';
import { CardType } from '@/_types/cards.type';

export default function SortableItem({ item }: { item: CardType }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: item.id });

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
      <Item item={item} />
    </li>
  );
}

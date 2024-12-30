import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';
import { CardType } from '@/_types/cards.type';

export default function SortableItem({
  item,
  onClickCard,
}: {
  item: CardType;
  onClickCard: (card: CardType) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.id,
    });

  return (
    <li
      onClick={() => onClickCard(item)}
      className={`h-full max-h-[260px] w-[280px] transform transition-all tablet:h-[94px] tablet:w-full pc:h-full ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
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

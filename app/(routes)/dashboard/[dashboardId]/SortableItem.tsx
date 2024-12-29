import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';
import { CardType } from '@/_types/cards.type';
import TodoCardModal from './TodoCardModal';
import { useParams } from 'next/navigation';

export default function SortableItem({ item }: { item: CardType }) {
  const { dashboardId } = useParams();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.id,
    });
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);

  const handleClickCard = () => {
    setIsCardModalVisible(true);
  };

  const handleCloseCardModal = () => {
    setIsCardModalVisible(false);
  };

  return (
    <>
      <li
        onClick={handleClickCard}
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

      {isCardModalVisible && (
        <>
          <TodoCardModal
            userId={item.assignee.id}
            cardId={item.id}
            columnTitle={item.title}
            dashboardId={Number(dashboardId)}
            onClose={handleCloseCardModal}
          />
        </>
      )}
    </>
  );
}

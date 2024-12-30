import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';
import { CardType } from '@/_types/cards.type';
import CreateCardButton from './CreateCardButton';
import Image from 'next/image';
import { useState } from 'react';
import EditColumnModal from '../EditColumnModal';
import { ColumnData, OnColumnHandlerType } from './Dashboard';

interface DroppableProps {
  id: string;
  dashBoardColor: string;
  title: string;
  items: CardType[];
  onColumnUpdated: OnColumnHandlerType;
  onColumnDeleted: OnColumnHandlerType;
  onClickCard: (card: CardType) => void;
  onClickColumn: ({ id, title }: ColumnData) => void;
  onClickCreateCard: ({ id, title }: ColumnData) => void;
}

export default function Droppable({
  id,
  dashBoardColor,
  items,
  title,
  onColumnUpdated,
  onClickCard,
  onClickCreateCard,
  onClickColumn,
  onColumnDeleted: onColumnDelete,
}: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const numericId = Number(id);
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleClickColumn = ({ id, title }: ColumnData) => {
    onClickColumn({ id, title });
  };

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div
        onClick={() => handleClickColumn({ id: numericId, title })}
        className="flex-shrink-0 py-4 mobile:w-full mobile:px-6 tablet:px-10 pc:w-[364px] pc:px-4"
      >
        <div className="border-b-2 pb-2 tablet:pb-6 pc:border-none">
          <div className="flex justify-between pb-1">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="sh h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: dashBoardColor }}
              />
              <div className="flex w-full max-w-[520px] items-center gap-4 px-1 tablet:max-w-[480px] pc:max-w-[300px]">
                <p className="truncate text-nowrap text-lg font-bold tablet:text-2lg">
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
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                onClick={handleOpenEditModal}
              />
            </div>
          </div>
          <CreateCardButton
            onClick={onClickCreateCard}
            id={Number(id)}
            title={title}
          />
          <ul
            ref={setNodeRef}
            className="tablet:scrollbar-hidden scrollbar-custom grid w-full grid-flow-col rounded-lg px-3 py-4 pb-8 mobile:gap-8 mobile:overflow-x-auto tablet:max-h-[220px] tablet:grid-flow-row tablet:gap-4 tablet:overflow-y-auto pc:h-full pc:max-h-full pc:gap-4"
          >
            {items.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onClickCard={onClickCard}
              />
            ))}
          </ul>
        </div>
        {isEditModalOpen && (
          <EditColumnModal
            columnId={Number(id)}
            initialTitle={title}
            onClose={handleCloseEditModal}
            onColumnUpdated={onColumnUpdated}
            onColumnDeleted={onColumnDelete}
          />
        )}
      </div>
    </SortableContext>
  );
}

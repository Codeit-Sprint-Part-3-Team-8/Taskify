import { UniqueIdentifier } from '@dnd-kit/core';

interface ItemsProps {
  id: UniqueIdentifier;
  dragOverlay?: boolean;
}

export function Item({ id, dragOverlay }: ItemsProps) {
  return (
    <div
      className={`item h-[70px] w-[200px] mobile:w-full ${dragOverlay ? 'cursor-grabbing' : 'cursor-grab'} rounded border-2 border-gray-200 bg-gray-100 p-4`}
    >
      할 일 카드 {id}
    </div>
  );
}

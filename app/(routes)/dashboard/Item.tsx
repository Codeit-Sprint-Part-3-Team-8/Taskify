import { UniqueIdentifier } from '@dnd-kit/core';

interface ItemsProps {
  id: UniqueIdentifier;
  dragOverlay?: boolean;
}

export function Item({ id, dragOverlay }: ItemsProps) {
  return (
    <div
      className={`item ${dragOverlay ? 'cursor-grabbing' : 'cursor-grab'} rounded border-2 border-gray-200`}
    >
      할 일 카드 {id}
    </div>
  );
}

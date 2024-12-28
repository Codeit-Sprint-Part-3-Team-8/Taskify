import { CardType } from '@/_types/cards.type';

interface ItemsProps {
  item: CardType;
  dragOverlay?: boolean;
}

export function Item({ item, dragOverlay }: ItemsProps) {
  return (
    <div
      className={`item h-[70px] w-[200px] mobile:w-full ${dragOverlay ? 'cursor-grabbing' : 'cursor-grab'} rounded border-2 border-gray-200 bg-gray-100 p-4`}
    >
      <p>{item.title}</p>
      <p>{item.id}</p>
    </div>
  );
}

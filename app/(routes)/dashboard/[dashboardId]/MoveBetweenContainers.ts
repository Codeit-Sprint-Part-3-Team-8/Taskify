import { UniqueIdentifier } from '@dnd-kit/core';

import { insertAtIndex, removeAtIndex } from './array';
import { ItemGroupsType } from './Dashboard';

interface MoveBetweenContainersProps {
  items: ItemGroupsType;
  activeContainer: number;
  overContainer: number;
  activeIndex: number;
  overIndex: number;
  item: UniqueIdentifier;
}

export default function MoveBetweenContainers({
  items,
  activeContainer,
  activeIndex,
  overContainer,
  overIndex,
  item,
}: MoveBetweenContainersProps) {
  const activeCard = items[activeContainer].cardData.cards.find(
    (card) => card.id.toString() === item.toString(),
  );

  return {
    ...items,
    [activeContainer]: {
      ...items[activeContainer],
      cardData: {
        ...items[activeContainer].cardData,
        cards: removeAtIndex(
          items[activeContainer].cardData.cards,
          activeIndex,
        ),
      },
    },
    [overContainer]: {
      ...items[overContainer],
      cardData: {
        ...items[overContainer].cardData,
        cards: insertAtIndex(
          items[overContainer].cardData.cards,
          overIndex,
          activeCard,
        ),
      },
    },
  };
}

import { UniqueIdentifier } from '@dnd-kit/core';

import { insertAtIndex, removeAtIndex } from './array';
import { itemGroupsType } from './Dashboard';

interface MoveBetweenContainersProps {
  items: itemGroupsType;
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
  const activeCard = items[activeContainer].cards.find(
    (card) => card.id.toString() === item.toString(),
  );

  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer].cards, activeIndex),
    [overContainer]: insertAtIndex(
      items[overContainer].cards,
      overIndex,
      activeCard,
    ),
  };
}

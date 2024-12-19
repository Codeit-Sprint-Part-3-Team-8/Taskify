import { UniqueIdentifier } from '@dnd-kit/core';
import { ItemGroupsProps } from './Dashboard';
import { insertAtIndex, removeAtIndex } from './array';

type ContainerId = keyof ItemGroupsProps;

interface MoveBetweenContainersProps {
  items: ItemGroupsProps;
  activeContainer: ContainerId;
  overContainer: ContainerId;
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
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
}

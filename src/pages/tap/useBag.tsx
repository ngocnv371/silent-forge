import { useState } from 'react';
import { ItemStack } from '../../models/item';

export default function useBag(
  initialItems: ItemStack[]
): [items: ItemStack[], addStack: (stacks: ItemStack[]) => void, removeStack: (stacks: ItemStack[]) => void] {
  const [items, setItems] = useState(initialItems);
  function addStack(stack: ItemStack) {
    const oldStack = items.find((i) => i.item.id === stack.item.id);
    if (oldStack) {
      setItems(
        items.map((i) => {
          if (i.item.id === stack.item.id) {
            return {
              item: i.item,
              quantity: i.quantity + stack.quantity,
            };
          }
          return i;
        })
      );
    } else {
      setItems([...items, stack]);
    }
  }
  function addStacks(stacks: ItemStack[]) {
    stacks.forEach((s) => addStack(s));
  }
  function removeStacks(stacks: ItemStack[]) {
    throw Error('not implemented');
  }
  return [items, addStacks, removeStacks];
}

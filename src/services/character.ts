import { ModifiersMap } from '../models/character';
import { Item } from '../models/item';

export function calculateModifiers(items: Item[]): ModifiersMap {
  console.count('calculateModifiers count');
  const modifiers: ModifiersMap = {};
  console.groupCollapsed(`calculate modifiers for ${items.length} items`);
  console.table(items);

  const validItems = items.filter(Boolean);
  for (let i = 0; i < validItems.length; i++) {
    const item = validItems[i];
    console.groupCollapsed(`processing item: ${item?.name || item.base}`);
    console.table(item.modifiers);
    item.modifiers.forEach((k) => {
      const oldValue = modifiers[k.effect];
      console.log(`old value for ${k.effect}: ${oldValue}`);
      const value = oldValue || 0;
      console.log(`add ${k.magnitude}`);
      modifiers[k.effect] = value + k.magnitude;
    });
    console.log(`updated modifiers table`);
    console.table(modifiers);
    console.groupEnd();
  }

  console.groupEnd();
  return modifiers;
}

import { ModifiersMap } from '../models/character';
import { Damage, Hit } from '../models/combat';
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

export function createHit(status: ModifiersMap): Hit {
  const physical = (status.addedPhysicalDamage | 0) * (1 + 0.1 * (status.increasedPhysicalDamage | 0));
  const cold = (status.addedColdDamage | 0) * (1 + 0.1 * (status.increasedColdDamage | 0));
  const fire = (status.addedFireDamage | 0) * (1 + 0.1 * (status.increasedFireDamage | 0));
  const lightning = (status.addedLightningDamage | 0) * (1 + 0.1 * (status.increasedLightningDamage | 0));
  const chaos = (status.addedChaosDamage | 0) * (1 + 0.1 * (status.increasedChaosDamage | 0));
  return {
    physical,
    cold,
    lightning,
    chaos,
    fire,
  };
}

export function takeHit(receiver: ModifiersMap, hit: Hit): Damage {
  function calculateDamage(damage: number, resistance: number) {
    const effectiveDamageModifier = 100 - resistance;
    console.log(`effective damage modifier: ${effectiveDamageModifier}%`);
    const affectiveDamage = (damage * effectiveDamageModifier) / 100;
    console.log(`takes ${affectiveDamage} damage`);
    return Math.floor(affectiveDamage);
  }
  console.log('calculate physical damage');
  const physical = hit.physical - (receiver.addedArmour | 0);
  console.log(`physical damage: ${physical}`);
  console.log('calculate cold damage');
  const cold = calculateDamage(hit.cold, (receiver.addedColdResistance | 0));
  console.log('calculate fire damage');
  const fire = calculateDamage(hit.fire, (receiver.addedFireResistance | 0));
  console.log('calculate lightning damage');
  const lightning = calculateDamage(hit.lightning, (receiver.addedLightningResistance | 0));
  console.log('calculate chaos damage');
  const chaos = calculateDamage(hit.chaos, (receiver.addedChaosResistance | 0));
  return {
    physical,
    cold,
    lightning,
    chaos,
    fire,
  };
}

export function applyDamage(damage: Damage, life: number) {
  const flatDamage = damage.chaos + damage.cold + damage.fire + damage.lightning + damage.physical;
  console.log(`flat damage: ${flatDamage}`);
  const newLife = life - flatDamage;
  return newLife;
}

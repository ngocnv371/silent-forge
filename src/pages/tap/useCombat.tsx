import { useMemo, useState } from 'react';
import { Character } from '../../models';
import { EquipmentSet, toItemArray } from '../../models/equipments';
import { applyDamage, calculateModifiers, createHit, takeHit } from '../../services/character';

export default function useCombat(equipmentSet: EquipmentSet, target: Character, onDead: Function): [number, Function] {
  const status = useMemo(() => {
    console.log('calculate combat status')
    const equipments = toItemArray(equipmentSet);
    return calculateModifiers(equipments);
  }, [equipmentSet]);
  const [life, setLife] = useState(target.life);
  const isDead = life < 1;
  
  function attack() {
    console.time('tap monster');
    console.groupCollapsed('tap monster');
    if (isDead) {
      console.log(`${target.name} is already dead`);
      return;
    }

    console.log('status');
    console.table(status);
    const hit = createHit(status);
    console.log(`hit`, hit);
    const dmg = takeHit({}, hit);
    // FIX: use monster's combat status instead
    const newLife = applyDamage(dmg, life);
    console.log(`life [${life}] -> [${newLife}]`);
    setLife(newLife);
    if (newLife < 1) {
      console.log(`${target.name} is slain`);
      onDead();
    }
    console.groupEnd();
    console.timeEnd('tap monster');
  }
  return [life, attack];
}

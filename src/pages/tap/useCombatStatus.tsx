import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { EquipmentSet, toItemArray } from '../../models/equipments';
import { calculateModifiers } from '../../services/character';

export default function useCombatStatus() {
  const set = useSelector((state: any) => state.equipments as EquipmentSet);
  const status = useMemo(() => {
    console.log(`equipments updated`);
    const equipments = toItemArray(set);
    console.table(equipments);
    const status = calculateModifiers(equipments);
    return status;
  }, [set]);
  return status;
}

import { useEffect, useState } from 'react';
import { createMonster, generateLoot } from '../../data/monsters';
import MonsterView from './monster';
import Atlas from '../../models/atlas';
import Rewards from './rewards';
import { useIonRouter } from '@ionic/react';
import useBag from './useBag';
import { Character } from '../../models';
import { useDispatch } from 'react-redux';
import { addStack } from '../../store/slices/inventory';

const Queue: React.FC<{ encounters: Atlas.EncounterInstance[] }> = ({ encounters }) => {
  const [encounterIndex, setEncounterIndex] = useState(0);
  const [bag, addStacks] = useBag([]);
  const [monsters, setMonsters] = useState([] as Character[]);
  const router = useIonRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('generate monsters');
    const m = encounters.map((e) => createMonster(e.name, e.level));
    console.table(m);
    setMonsters(m);
  }, [encounters]);

  const showRewards = encounterIndex >= encounters.length;
  console.log(`encounterIndex: ${encounterIndex}`);

  function onMonsterDead() {
    console.log('move on to next encounter');
    const loot = generateLoot(monsters[encounterIndex]);
    setEncounterIndex(encounterIndex + 1);
    addStacks(loot);
  }

  function handleCollect() {
    console.log(`collect rewards`, bag);
    bag.forEach((stack) => {
      dispatch(addStack(stack));
    });
    router.goBack();
  }

  return (
    <div className="monsters-queue">
      {monsters.map((m, idx) => (
        <MonsterView key={idx} monster={monsters[idx]} onDead={onMonsterDead} disabled={encounterIndex !== idx} />
      ))}
      {showRewards && <Rewards items={bag} onCollect={handleCollect} />}
    </div>
  );
};

export default Queue;

import { useState } from 'react';
import { createMonster, generateLoot } from '../../data/monsters';
import MonsterView from './monster';
import Atlas from '../../models/atlas';
import Rewards from './rewards';
import { useIonRouter } from '@ionic/react';
import useBag from './useBag';

const Queue: React.FC<{ encounters: Atlas.EncounterInstance[] }> = ({ encounters }) => {
  const [encounterIndex, setEncounterIndex] = useState(0);
  const [bag, addStacks] = useBag([]);
  const [monsters] = useState(encounters.map((e) => createMonster(e.name, e.level)));
  const router = useIonRouter();
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

import { useState } from 'react';
import { createMonster, generateLoot } from '../../data/monsters';
import MonsterView from './monster';
import Atlas from '../../models/atlas';
import Rewards from './rewards';
import { ItemStack } from '../../models/item';
import { useIonRouter } from '@ionic/react';

const Queue: React.FC<{ encounters: Atlas.EncounterInstance[] }> = ({ encounters }) => {
  const [encounterIndex, setEncounterIndex] = useState(0);
  const [rewards, setRewards] = useState([] as ItemStack[]);
  const [monsters] = useState(encounters.map((e) => createMonster(e.name, e.level)));
  const router = useIonRouter();
  const showRewards = encounterIndex >= encounters.length;
  console.log(`encounterIndex: ${encounterIndex}`);

  function onMonsterDead() {
    console.log('move on to next encounter');
    const loot = generateLoot(monsters[encounterIndex]);
    setEncounterIndex(encounterIndex + 1);
    setRewards([...rewards, ...loot]);
  }

  function handleCollect() {
    console.log(`collect rewards`, rewards);
    router.goBack();
  }

  return (
    <div className="monsters-queue">
      {monsters.map((m, idx) => (
        <MonsterView key={idx} monster={monsters[idx]} onDead={onMonsterDead} disabled={encounterIndex !== idx} />
      ))}
      {showRewards && <Rewards items={rewards} onCollect={handleCollect} />}
    </div>
  );
};

export default Queue;

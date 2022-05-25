import { useState } from 'react';
import { createMonster } from '../../data/monsters';
import MonsterView from './monster';
import Atlas from '../../models/atlas';

const Queue: React.FC<{ encounters: Atlas.EncounterInstance[] }> = ({ encounters }) => {
  const [encounterIndex, setEncounterIndex] = useState(0);
  const [monsters] = useState(encounters.map((e) => createMonster(e.name, e.level)));
  console.log(`encounterIndex: ${encounterIndex}`);

  function onMonsterDead(idx: number) {
    console.log('move on to next encounter')
    if (encounterIndex < encounters.length - 1) {
      setEncounterIndex(encounterIndex + 1);
    }
  }
  return (
    <section>
      {monsters.map((m, idx) => (
        <MonsterView
          key={idx}
          monster={monsters[idx]}
          onDead={() => onMonsterDead(idx)}
          disabled={encounterIndex !== idx}
        />
      ))}
    </section>
  );
};

export default Queue;

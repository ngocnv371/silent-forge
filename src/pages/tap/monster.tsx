import { IonCard, IonCardHeader, IonImg, IonProgressBar, IonTitle } from '@ionic/react';
import { useState } from 'react';
import { Character } from '../../models';
import { applyDamage, createHit, takeHit } from '../../services/character';
import useCombatStatus from './useCombatStatus';

const MonsterView: React.FC<{ monster: Character; disabled: boolean; onDead: Function }> = ({
  monster,
  disabled,
  onDead,
}) => {
  const status = useCombatStatus();
  const [life, setLife] = useState(monster.maxLife);
  const percentage = life / monster.maxLife;
  const isDead = life < 1;
  function handleTap() {
    if (isDead) {
      console.log(`${monster.name} is already dead`);
      return;
    }
    console.groupCollapsed('tap monster');
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
      console.log(`${monster.name} is slain`);
      onDead();
    }
    console.groupEnd();
  }
  if (disabled) {
    return <></>;
  }
  return (
    <IonCard onClick={handleTap}>
      <IonProgressBar style={{ height: '10px' }} color="danger" value={percentage} />
      <IonCardHeader>
        <IonTitle>
          {monster.name} {life}/{monster.maxLife}
        </IonTitle>
      </IonCardHeader>
      <IonImg src="/assets/lil_chick.svg" />
    </IonCard>
  );
};

export default MonsterView;

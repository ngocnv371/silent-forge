import { IonCard, IonCardHeader, IonImg, IonProgressBar, IonTitle } from '@ionic/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Character } from '../../models';
import { applyDamage, CharacterCombatStatus, getAttackDamage } from '../../models/combat';

const MonsterView: React.FC<{ monster: Character; disabled: boolean; onDead: Function }> = ({
  monster,
  disabled,
  onDead,
}) => {
  const combat = useSelector((state: any) => state.combat) as CharacterCombatStatus;
  const [life, setLife] = useState(monster.maxLife);
  const percentage = life / monster.maxLife;
  const isDead = life < 1;
  function handleTap() {
    if (isDead) {
      console.log(`${monster.name} is already dead`);
      return;
    }
    console.groupCollapsed('tap monster');
    const dmg = getAttackDamage(combat);
    console.log(`damage`, dmg);
    // FIX: use monster's combat status instead
    const newLife = applyDamage(dmg, life, combat);
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

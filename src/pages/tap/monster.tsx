import { IonCard, IonCardHeader, IonImg, IonProgressBar, IonText, IonTitle } from '@ionic/react';
import { useState } from 'react';
import { Character } from '../../models';

const MonsterView: React.FC<{ monster: Character; disabled: boolean; onDead: Function }> = ({
  monster,
  disabled,
  onDead,
}) => {
  const [life, setLife] = useState(monster.maxLife);
  const percentage = life / monster.maxLife;
  const isDead = life < 1;
  function handleTap() {
    if (isDead) {
      console.log(`${monster.name} is already dead`);
      return;
    }
    const newLife = life - 10;
    setLife(newLife);
    if (newLife < 1) {
      console.log(`${monster.name} is slain`);
      onDead();
    }
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

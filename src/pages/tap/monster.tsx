import { IonCard, IonCardHeader, IonImg, IonProgressBar, IonTitle } from '@ionic/react';
import { useSelector } from 'react-redux';
import { Character } from '../../models';
import { EquipmentSet } from '../../models/equipments';
import useCombat from './useCombat';

const MonsterView: React.FC<{ monster: Character; disabled: boolean; onDead: Function }> = ({
  monster,
  disabled,
  onDead,
}) => {
  const set = useSelector((state: any) => state.equipments as EquipmentSet);
  const [life, attack] = useCombat(set, monster, onDead);
  const percentage = life / monster.maxLife;

  if (disabled) {
    return <></>;
  }
  return (
    <IonCard onClick={() => attack()}>
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

import { IonItem, IonLabel, IonList, IonListHeader, IonNote } from '@ionic/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { EquipmentSet } from '../../models/equipments';
import { Item } from '../../models/item';
import { calculateModifiers } from '../../services/character';

const ModifiersList: React.FC = () => {
  const set = useSelector((state: any) => state.equipments as EquipmentSet);
  const modifiers = useMemo(() => calculateModifiers(Object.keys(set).map((k) => (set as any)[k] as Item)), [set]);

  return (
    <IonList>
      <IonListHeader>Modifiers</IonListHeader>
      {Object.keys(modifiers).map((k) => (
        <IonItem key={k}>
          <IonLabel>{k}</IonLabel>
          <IonNote>{modifiers[k]}</IonNote>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ModifiersList;

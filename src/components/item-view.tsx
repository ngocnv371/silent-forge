import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/react';
import { useMemo } from 'react';
import { Item, ModifierInstance } from '../models/item';

function formatModifierDescription(instance: ModifierInstance) {
  let desc = instance.description;
  desc = desc.replace('#', instance.magnitude.toString());
  return desc;
}

function ModifierInstanceView({ instance }: { instance: ModifierInstance }) {
  const desc = useMemo(() => formatModifierDescription(instance), [instance]);
  return (
    <IonItem>
      <IonLabel>{desc}</IonLabel>
    </IonItem>
  );
}

const ItemView: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{item.base}</IonCardSubtitle>
        <IonCardTitle>{item.name}</IonCardTitle>
      </IonCardHeader>
      <IonList>
        {item.modifiers.map((i) => (
          <ModifierInstanceView key={i.name} instance={i} />
        ))}
      </IonList>
    </IonCard>
  );
}

export default ItemView;

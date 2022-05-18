import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item, ModifierInstance } from '../models/item';
import { reforgeItem } from '../store/slices/forge';

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

function ItemView({ item }: { item: Item }) {
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

const Forge: React.FC = () => {
  const item = useSelector((state: any) => state.forge.item) as Item;
  const dispatch = useDispatch();

  return (
    <IonPage id="forge-page">
      <IonContent fullscreen>
        <ItemView item={item} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton color="warning" onClick={() => dispatch(reforgeItem())}>
              <IonIcon slot="icon-only" icon={refresh} /> Reforge
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Forge;

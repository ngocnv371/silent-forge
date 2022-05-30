import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { hammer, trash } from 'ionicons/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemStack } from '../models/item';

const ItemPreview: React.FC<ItemStack> = ({ item, quantity }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonTitle>{item.name}</IonTitle>
        <IonNote slot="end">{quantity}</IonNote>
      </IonCardHeader>
      <IonToolbar>
        <IonButtons>
          <IonButton color="danger">
            <IonIcon slot="start" icon={trash} />
            Drop
          </IonButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton routerLink="/forge" color="secondary">
            <IonIcon slot="start" icon={hammer} />
            Forge
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

const Inventory: React.FC = () => {
  const [selectedStack, selectStack] = useState<ItemStack>();
  const items = useSelector((state: any) => state.inventory as ItemStack[]);

  return (
    <IonPage id="inventory-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {selectedStack && <ItemPreview {...selectedStack} />}
        <IonList>
          {items &&
            items.map((stack) => (
              <IonItem key={stack.item.id} onClick={() => selectStack(stack)}>
                <IonLabel>{stack.item.name}</IonLabel>
                {stack.quantity > 1 && <IonNote slot="end">{stack.quantity}</IonNote>}
              </IonItem>
            ))}
          {(!items || !items.length) && (
            <IonItem>
              <IonLabel>Empty</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Inventory;

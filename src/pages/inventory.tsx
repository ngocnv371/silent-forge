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
import { useDispatch, useSelector } from 'react-redux';
import { ItemStack } from '../models/item';
import { removeStack } from '../store/slices/inventory';

const ItemPreview: React.FC<ItemStack & { onDrop: Function }> = ({ item, quantity, onDrop }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonTitle>{item.name}</IonTitle>
        <IonNote slot="end">{quantity}</IonNote>
      </IonCardHeader>
      <IonToolbar>
        <IonButtons>
          <IonButton color="danger" onClick={() => onDrop()}>
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
  const dispatch = useDispatch();
  const [selectedStack, selectStack] = useState<ItemStack>();
  const items = useSelector((state: any) => state.inventory as ItemStack[]);

  function handleDrop() {
    if (!selectedStack) {
      return;
    }
    dispatch(removeStack(selectedStack));
    selectStack(undefined);
  }

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
        {selectedStack && <ItemPreview {...selectedStack} onDrop={handleDrop} />}
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

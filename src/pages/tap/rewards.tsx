import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonToolbar } from '@ionic/react';
import ItemsList from '../../components/items-list';
import { ItemStack } from '../../models/item';

const Rewards: React.FC<{ items: ItemStack[]; onCollect: Function }> = (props) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Rewards</IonCardTitle>
      </IonCardHeader>
      <ItemsList items={props.items} />
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton onClick={() => props.onCollect()}>Collect</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default Rewards;

import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import ItemsList from '../../components/items-list';
import { ItemStack } from '../../models/item';

const Rewards: React.FC<{ items: ItemStack[] }> = ({ items }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Rewards</IonCardTitle>
      </IonCardHeader>
      <ItemsList items={items} />
    </IonCard>
  );
};

export default Rewards;

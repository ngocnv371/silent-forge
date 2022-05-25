import { IonList } from '@ionic/react';
import { ItemStack } from '../models/item';
import ItemView from './item-view';

const ItemsList: React.FC<{ items: ItemStack[] }> = ({ items }) => {
  return (
    <IonList>
      {items.map((i, idx) => (
        <ItemView key={idx} {...i} />
      ))}
    </IonList>
  );
};

export default ItemsList;

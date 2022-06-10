import { IonList } from '@ionic/react';
import { ItemStack } from '../models/item';
import ItemStackView from './item-stack-view';

const ItemsList: React.FC<{ items: ItemStack[] }> = ({ items }) => {
  return (
    <IonList>
      {items.map((i, idx) => (
        <ItemStackView key={idx} {...i} />
      ))}
    </IonList>
  );
};

export default ItemsList;

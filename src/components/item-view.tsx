import { IonItem, IonLabel, IonNote } from '@ionic/react';
import { ItemRarity, ItemStack } from '../models/item';

const ItemView: React.FC<ItemStack> = (props) => {
  const color = props.item.rarity === ItemRarity.Rare ? 'warning' : '';
  return (
    <IonItem color={color}>
      <IonLabel>{props.item.name}</IonLabel>
      <IonNote slot="end">{props.quantity}</IonNote>
    </IonItem>
  );
};

export default ItemView;

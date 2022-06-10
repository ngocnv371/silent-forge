import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemView from '../components/item-view';
import { EquipmentSet, EquipmentSlot } from '../models/equipments';
import { Item } from '../models/item';

const ItemPreview: React.FC<{ item: Item, onDrop: Function }> = ({ item, onDrop }) => {
  return (
    <ItemView item={item} />
  );
};

const Equipment: React.FC<{ slot: EquipmentSlot; item?: Item; onClick: Function }> = ({ slot, item, onClick }) => {
  if (!item) {
    return (
      <IonItem>
        <IonLabel>{slot}</IonLabel>
        <IonNote slot="end">Empty</IonNote>
      </IonItem>
    );
  }
  return (
    <IonItem onClick={() => onClick()}>
      <IonLabel>{slot}</IonLabel>
      <p>{item.name}</p>
    </IonItem>
  );
};

const Equipments: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedItem, selectItem] = useState<Item>();
  const set = useSelector((state: any) => state.equipments as EquipmentSet);

  function handleDrop() {
    // drop
  }

  function handleSelect(item?: Item) {
    if (selectedItem === item) {
      selectItem(undefined);
    } else {
      selectItem(item);
    }
  }

  return (
    <IonPage id="inventory-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Equipments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {set && (
            <>
              <Equipment slot='bodyArmour' item={set.bodyArmour} onClick={() => handleSelect(set.bodyArmour)} />
              <Equipment slot='gloves' item={set.gloves} onClick={() => handleSelect(set.gloves)} />
              <Equipment slot='boots' item={set.boots} onClick={() => handleSelect(set.boots)} />
              <Equipment slot='rightRing' item={set.rightRing} onClick={() => handleSelect(set.rightRing)} />
              <Equipment slot='leftRing' item={set.leftRing} onClick={() => handleSelect(set.leftRing)} />
              <Equipment slot='amulet' item={set.amulet} onClick={() => handleSelect(set.amulet)} />
              <Equipment slot='mainHand' item={set.mainHand} onClick={() => handleSelect(set.mainHand)} />
              <Equipment slot='offHand' item={set.offHand} onClick={() => handleSelect(set.offHand)} />
              <Equipment slot='helmet' item={set.helmet} onClick={() => handleSelect(set.helmet)} />
            </>
          )}
          {!set && (
            <IonItem>
              <IonLabel>Empty</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
      <IonFooter>{selectedItem && <ItemPreview item={selectedItem} onDrop={handleDrop} />}</IonFooter>
    </IonPage>
  );
};

export default Equipments;

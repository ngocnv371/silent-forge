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
import { useSelector } from 'react-redux';
import ItemView from '../components/item-view';
import { EquipmentSet, EquipmentSlot } from '../models/equipments';
import { Item } from '../models/item';

const ItemPreview: React.FC<{ item: Item; onDrop: Function }> = ({ item, onDrop }) => {
  return <ItemView item={item} />;
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
          {set &&
            Object.keys(set).map((k) => {
              const slot = k as EquipmentSlot;
              return <Equipment key={k} slot={slot} item={set[slot]} onClick={() => handleSelect(set[slot])} />;
            })}
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

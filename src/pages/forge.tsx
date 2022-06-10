import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { refresh } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import ItemView from '../components/item-view';
import { Item } from '../models/item';
import { reforgeItem } from '../store/slices/forge';

const Forge: React.FC = () => {
  const item = useSelector((state: any) => state.forge.item) as Item;
  const dispatch = useDispatch();

  return (
    <IonPage id="forge-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forge</IonTitle>
        </IonToolbar>
      </IonHeader>
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

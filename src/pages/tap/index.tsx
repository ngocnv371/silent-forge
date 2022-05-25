import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonPage,
  IonProgressBar,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { exit, refresh } from 'ionicons/icons';
import { reset, tap } from '../../store/slices/tap';
import { useDispatch, useSelector } from 'react-redux';

import { useMemo } from 'react';
import MonsterView from './monster';
import { Character } from '../../models';
import Queue from './queue';
import { maps } from '../../data/atlas';

const Tap: React.FC = () => {
  const dispatch = useDispatch();
  const map = maps[0];
  const encounters = map.encounters.map((e) => ({ name: e.name, level: 15 }));
  console.log(encounters)
  
  return (
    <IonPage id="tap-page">
      <IonContent fullscreen>
        <Queue encounters={encounters} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton color="primary" onClick={() => dispatch(reset())}>
              <IonIcon slot="icon-only" icon={refresh} />
            </IonButton>
            <IonButton color="danger">
              <IonIcon slot="icon-only" icon={exit} /> Run
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tap;

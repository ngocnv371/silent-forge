import {
  IonBackButton,
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
import { exit, refresh } from 'ionicons/icons';
import { reset } from '../../store/slices/tap';
import { useDispatch } from 'react-redux';

import Queue from './queue';
import { RouteComponentProps } from 'react-router';
import useEncounters from './useEncounter';

interface TapPageProps
  extends RouteComponentProps<{
    map: string;
  }> {}

const Tap: React.FC<TapPageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const encounters = useEncounters(match.params.map);

  return (
    <IonPage id="tap-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{encounters && encounters.length && <Queue encounters={encounters} />}</IonContent>
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

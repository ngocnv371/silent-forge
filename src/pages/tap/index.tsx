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

import { useEffect, useState } from 'react';
import Queue from './queue';
import { maps } from '../../data/atlas';
import { RouteComponentProps } from 'react-router';
import Atlas from '../../models/atlas';

interface TapPageProps
  extends RouteComponentProps<{
    map: string;
  }> {}

const Tap: React.FC<TapPageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const [map, setMap] = useState<Atlas.Map>();
  const [encounters, setEncounters] = useState([] as Atlas.EncounterInstance[]);

  useEffect(() => {
    const map = maps.find((m) => m.id === match.params.map);
    if (!map) {
      console.error(`map '${match.params.map}' not found`);
      return;
    }
    console.log(`found map`, map);
    setMap(map);
  }, [match.params.map]);

  useEffect(() => {
    if (!map) {
      return;
    }
    const encounters: Atlas.EncounterInstance[] = map.encounters.map((e) => ({ name: e.name, level: 15 }));
    setEncounters(encounters);
    console.log(`generated encounters`);
    console.table(encounters);
  }, [map]);

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

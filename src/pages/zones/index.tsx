import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  SegmentChangeEventDetail,
} from '@ionic/react';
import { useMemo, useState } from 'react';
import { Region } from '../../models/zone';

const regions = require('../../data/zones.json') as Region[];

const segments = regions.map((r) => (
  <IonSegmentButton key={r.id} value={r.id}>
    <IonLabel>{r.name}</IonLabel>
  </IonSegmentButton>
));

const Zones: React.FC = () => {
  const [segmentId, setSegmentId] = useState(regions[0].id);
  const zones = useMemo(
    () =>
      regions
        .find((r) => r.id === segmentId)
        ?.zones.map((z) => (
          <IonItem key={z.id}>
            <IonLabel>{z.name}</IonLabel>
            <IonNote slot="end" color="warning">
              {z.price}G
            </IonNote>
          </IonItem>
        )),
    [segmentId]
  );
  function handleSegmentChanged(e: CustomEvent<SegmentChangeEventDetail>) {
    e.detail.value && setSegmentId(e.detail.value);
  }
  return (
    <IonPage id="zones-page">
      <IonHeader>
        <IonToolbar>
          <IonSegment scrollable onIonChange={handleSegmentChanged}>
            {segments}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>{zones}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default Zones;

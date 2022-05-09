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

const regions = [
  {
    id: 'Sarn',
    name: 'Sarn',
    zones: [
      { id: 1, name: 'Crematerium' },
      { id: 2, name: 'Gateway' },
      { id: 3, name: 'Grains Gate' },
      { id: 4, name: 'Market' },
      { id: 5, name: 'Battle Field' },
    ],
  },
  {
    id: 'Oriath',
    name: 'Oriath',
    zones: [
      { id: 6, name: 'Catheral' },
      { id: 7, name: 'City Square' },
      { id: 8, name: 'Cannals' },
      { id: 9, name: 'Slave Pens' },
      { id: 10, name: 'Overseer' },
    ],
  },
  {
    id: 'Highlands',
    name: 'Highlands',
    zones: [
      { id: 11, name: 'Supply Way' },
      { id: 12, name: 'Rope' },
      { id: 13, name: "Goat's path" },
      { id: 14, name: 'Temple' },
    ],
  },
];

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
              {z.id * 100}G
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

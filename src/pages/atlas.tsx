import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useEffect, useState } from 'react';
import regions from '../data/atlas';
import Atlas from '../models/atlas';

const segments = regions.map((r) => (
  <IonSegmentButton key={r.id} value={r.id}>
    <IonLabel>{r.name}</IonLabel>
  </IonSegmentButton>
));

const MapItem: React.FC<{ map: Atlas.Map }> = ({ map }) => {
  return (
    <IonCard key={map.id} id={`map-${map.id}`} routerLink={`/tap/${map.id}`}>
      <IonCardHeader>
        <IonCardTitle>{map.name}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

const AtlasView: React.FC = () => {
  const [region, setRegion] = useState(regions[0].id);
  const [maps, setMaps] = useState(regions[0].maps);

  useEffect(() => {
    const r = regions.find((r) => r.id === region);
    if (!r) {
      console.error(`region '${region}' not found`);
      return;
    }
    console.log(`map list updated`);
    console.table(r.maps);
    setMaps(r.maps);
  }, [region]);

  return (
    <IonPage id="maps-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Select a map</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment scrollable onIonChange={(e) => e.detail.value && setRegion(e.detail.value)} value={region}>
            {segments}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {maps?.map((item) => (
            <MapItem key={item.name} map={item} />
          ))}
          {!maps && (
            <IonItem>
              <IonLabel>No maps found!</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AtlasView;

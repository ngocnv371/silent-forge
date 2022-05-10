import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  SegmentChangeEventDetail,
} from '@ionic/react';
import { pin, location, play, wifi, wine, warning, walk, stop } from 'ionicons/icons';
import { useEffect, useMemo, useState } from 'react';
import { Region, Zone } from '../../models/zone';
import { regions } from './data';
import useActiveSkillZone from './useActiveSkillZone';

const segments = regions.map((r) => (
  <IonSegmentButton key={r.id} value={r.id}>
    <IonLabel>{r.name}</IonLabel>
  </IonSegmentButton>
));

type ZoneItemProps = {
  item: Zone;
  active: boolean;
  onStart: Function;
  onStop: Function;
};

const ZoneItem: React.FC<ZoneItemProps> = (props: ZoneItemProps) => {
  return (
    <IonCard key={props.item.id} id={`zone-${props.item.id}`}>
      {props.active && <IonProgressBar type="indeterminate" />}
      <IonCardHeader>
        <IonCardTitle>{props.item.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{props.item.description}</IonCardContent>
      <IonToolbar>
        <IonButtons slot="primary">
          {!props.active && (
            <IonButton onClick={() => props.onStart && props.onStart()}>
              <IonIcon icon={play} />
            </IonButton>
          )}
          {props.active && (
            <IonButton color="danger" onClick={() => props.onStop && props.onStop()}>
              <IonIcon icon={stop} />
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

const Zones: React.FC = (a) => {
  const [segmentId, setSegmentId] = useState(regions[0].id);
  const [activeZoneId, setActiveZoneId] = useActiveSkillZone('');

  const zones = useMemo(() => regions.find((r) => r.id === segmentId)?.zones, [segmentId]);
  function handleSegmentChanged(e: CustomEvent<SegmentChangeEventDetail>) {
    e.detail.value && setSegmentId(e.detail.value);
  }

  return (
    <IonPage id="zones-page">
      <IonHeader>
        <IonToolbar>
          <IonSegment scrollable onIonChange={handleSegmentChanged} value={segmentId}>
            {segments}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {zones?.map((item) => (
            <ZoneItem
              key={item.id}
              item={item}
              active={activeZoneId === item.id}
              onStart={() => setActiveZoneId(item.id)}
              onStop={() => setActiveZoneId('')}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Zones;

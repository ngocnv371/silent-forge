import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/react';
import { bulbOutline, heartOutline, pulseOutline } from 'ionicons/icons';

import { useSelector } from 'react-redux';

function StrengthStat({ value }: { value: number }) {
  return (
    <IonItem>
      <IonIcon slot="start" icon={heartOutline} />
      <IonLabel>Strength</IonLabel>
      <IonNote slot="end" color="danger">
        {value}
      </IonNote>
    </IonItem>
  );
}
function DexterityStat({ value }: { value: number }) {
  return (
    <IonItem>
      <IonIcon slot="start" icon={pulseOutline} />
      <IonLabel>Dexterity</IonLabel>
      <IonNote slot="end" color="danger">
        {value}
      </IonNote>
    </IonItem>
  );
}
function IntelligenceStat({ value }: { value: number }) {
  return (
    <IonItem>
      <IonIcon slot="start" icon={bulbOutline} />
      <IonLabel>Intelligence</IonLabel>
      <IonNote slot="end" color="danger">
        {value}
      </IonNote>
    </IonItem>
  );
}

const BasicStats: React.FC = () => {
  const str = useSelector((state: any) => state.status.strength);
  const dex = useSelector((state: any) => state.status.dexterity);
  const int = useSelector((state: any) => state.status.intelligence);
  return (
    <>
      <StrengthStat value={str} />
      <DexterityStat value={dex} />
      <IntelligenceStat value={int} />
    </>
  );
};

export default BasicStats;

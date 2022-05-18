import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import BasicStats from './basic';
import Profile from './profile';

const Status: React.FC = () => {
  return (
    <IonPage id="status-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Status</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <Profile />
          <BasicStats />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Status;

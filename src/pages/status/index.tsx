import { IonContent, IonList, IonPage } from '@ionic/react';

import BasicStats from './basic';
import Profile from './profile';

const Status: React.FC = () => {
  return (
    <IonPage id="status-page">
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

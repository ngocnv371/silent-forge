import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';

const Setting: React.FC = () => {
  return (
    <IonPage id="setting-page">
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Setting 1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Setting 1</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Setting;

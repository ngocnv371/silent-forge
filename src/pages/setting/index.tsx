import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonToggle } from '@ionic/react';

const Setting: React.FC = () => {
  return (
    <IonPage id="setting-page">
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Appearance</IonListHeader>
          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle></IonToggle>
          </IonItem>
          <IonListHeader>Wiki</IonListHeader>
          <IonItem routerLink='/wiki/monsters'>
            <IonLabel>Monsters</IonLabel>
          </IonItem>
          <IonItem routerLink='/wiki/items'>
            <IonLabel>Items</IonLabel>
          </IonItem>
          <IonItem routerLink='/wiki/modifiers'>
            <IonLabel>Modifiers</IonLabel>
          </IonItem>
          <IonItem routerLink='/wiki/atlas'>
            <IonLabel>Atlas</IonLabel>
          </IonItem>
          <IonListHeader>More</IonListHeader>
          <IonItem routerLink='/equipments'>
            <IonLabel>Equipments</IonLabel>
          </IonItem>
          <IonItem routerLink='/inventory'>
            <IonLabel>Inventory</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Setting;

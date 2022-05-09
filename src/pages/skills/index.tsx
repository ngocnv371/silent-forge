import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage } from '@ionic/react';
import { fish, paw } from 'ionicons/icons';

const Skills: React.FC = () => {
  return (
    <IonPage id="skills-page">
      <IonContent fullscreen>
        <IonList>
          <IonItem routerLink='/skills/fishing/zones'>
            <IonIcon slot="start" icon={fish} />
            <IonLabel>Fishing</IonLabel>
            <IonNote slot="end" color="success">
              Level 3
            </IonNote>
          </IonItem>
          <IonItem routerLink='/skills/hunting/zones'>
            <IonIcon slot="start" icon={paw} />
            <IonLabel>Hunting</IonLabel>
            <IonNote slot="end" color="success">
              Level 12
            </IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Skills;

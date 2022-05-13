import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import mods from '../../data/mod-sources';

const Items: React.FC = () => {
  return (
    <IonPage id="wiki-mods-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wiki &gt; Mods</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {mods.map((mod) => (
            <IonCard key={mod.name}>
              <IonCardHeader>
                <IonLabel>{mod.name}</IonLabel>
              </IonCardHeader>
              <IonCardContent>{mod.description}</IonCardContent>
              <IonList>
                {mod.tiers.map((t, idx) => (
                  <IonItem key={idx}>
                    <IonLabel>
                      <IonText color="secondary">Level {t.level}</IonText>{' '}
                      <IonText>
                        [{t.magnitudes[0]} - {t.magnitudes[1]}]
                      </IonText>
                    </IonLabel>
                    <IonNote slot="end" color="danger">
                      {t.weight}
                    </IonNote>
                  </IonItem>
                ))}
              </IonList>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Items;

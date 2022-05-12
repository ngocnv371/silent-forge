import {
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import items from '../../data/items';

const Items: React.FC = () => {
  return (
    <IonPage id="wiki-items-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wiki &gt; Items</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {items.map((item) => (
            <IonItem key={item.name}>
              <IonLabel>
                <h3>{item.name}</h3>
                <p>{item.tags && item.tags.map((t) => <IonChip key={t}>{t}</IonChip>)}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Items;

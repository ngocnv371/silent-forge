import {
  IonAccordion,
  IonAccordionGroup,
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
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMemo, useState } from 'react';
import originalMods from '../../data/mod-sources';

const Items: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const filteredMods = useMemo(
    () =>
      originalMods.filter(
        (m) =>
          m.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
          m.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      ),
    [searchText]
  );

  return (
    <IonPage id="wiki-mods-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wiki &gt; Mods</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value!)} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {filteredMods.map((mod) => (
            <IonCard key={mod.name}>
              <IonCardHeader style={{ padding: 0 }}>
                <IonItem>
                  <IonLabel>{mod.name}</IonLabel>
                  <IonChip slot="end">{mod.type}</IonChip>
                </IonItem>
              </IonCardHeader>
              <IonCardContent>
                {mod.tags.map((t) => (
                  <IonChip key={t}>{t}</IonChip>
                ))}
                <IonText>
                  <p>{mod.description}</p>
                </IonText>
              </IonCardContent>
              <IonAccordionGroup>
                <IonAccordion value="tiers">
                  <IonItem slot="header">
                    <IonLabel>Tiers</IonLabel>
                  </IonItem>
                  <IonList slot="content">
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
                </IonAccordion>
              </IonAccordionGroup>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Items;

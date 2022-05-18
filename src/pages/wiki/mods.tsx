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
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMemo, useState } from 'react';
import originalMods, { tags as originalTags } from '../../data/mod-sources';

const Items: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([] as string[]);
  const filteredMods = useMemo(
    () =>
      originalMods
        .filter(
          (m) =>
            m.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
            m.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        )
        .filter((m) => !tags.length || m.tags.some((t) => tags.includes(t))),
    [searchText, tags]
  );

  return (
    <IonPage id="wiki-monsters-page">
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
          <IonItem>
            <IonLabel>Tags</IonLabel>
            <IonSelect value={tags} multiple onIonChange={(e) => setTags(e.detail.value!)}>
              {originalTags.map((t) => (
                <IonSelectOption key={t} value={t}>
                  {t}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
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

import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMemo, useState } from 'react';
import originalMods, { tags as originalTags } from '../../data/modifiers';
import { Modifier, ModifierType } from '../../models/item';

const ModifierView: React.FC<{ modifier: Modifier }> = ({ modifier }) => {
  return (
    <IonCard key={modifier.name}>
      <IonCardHeader style={{ padding: 0 }}>
        <IonItem>
          <IonLabel>{modifier.name}</IonLabel>
          <IonChip slot="end">{modifier.type}</IonChip>
        </IonItem>
      </IonCardHeader>
      <IonCardContent>
        {modifier.tags.map((t) => (
          <IonChip key={t}>{t}</IonChip>
        ))}
        <IonText>
          <p>{modifier.description}</p>
        </IonText>
      </IonCardContent>
      <IonAccordionGroup>
        <IonAccordion value="tiers">
          <IonItem slot="header">
            <IonLabel>Tiers</IonLabel>
          </IonItem>
          <IonList slot="content">
            {modifier.tiers.map((t, idx) => (
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
  );
};

const affixes = [ModifierType.Prefix.toString(), ModifierType.Suffix.toString()];

function selectData(searchText: string, affixes: string[], tags: string[]): Modifier[] {
  return originalMods
    .filter((m) => !affixes.length || affixes.includes(m.type))
    .filter(
      (m) => !tags.length || tags.some((t) => t === m.type.toLocaleLowerCase()) || m.tags.some((t) => tags.includes(t))
    )
    .filter(
      (m) =>
        m.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        m.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
}

const Modifiers: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTags, selectTags] = useState([] as string[]);
  const [selectedAffixes, selectAffixes] = useState([] as string[]);
  const filteredItems = useMemo(
    () => selectData(searchText, selectedAffixes, selectedTags),
    [searchText, selectedAffixes, selectedTags]
  );
  return (
    <IonPage id="wiki-modifiers-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Wiki &gt; Modifiers</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value!)} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Affix</IonLabel>
            <IonSelect value={selectedAffixes} multiple onIonChange={(e) => selectAffixes(e.detail.value!)}>
              {affixes.map((t) => (
                <IonSelectOption key={t} value={t}>
                  {t}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Tags</IonLabel>
            <IonSelect value={selectedTags} multiple onIonChange={(e) => selectTags(e.detail.value!)}>
              {originalTags.map((t) => (
                <IonSelectOption key={t} value={t}>
                  {t}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {filteredItems.map((m) => (
            <ModifierView key={m.name} modifier={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Modifiers;

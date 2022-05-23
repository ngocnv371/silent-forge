import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonAccordionGroup,
  IonAccordion,
  IonNote,
} from '@ionic/react';
import { useMemo, useState } from 'react';
import regions, { maps, tags } from '../../data/atlas';
import Region from '../../models/atlas';

const EncounterView: React.FC<{ encounter: Region.Encounter }> = ({ encounter }) => {
  return (
    <IonItem>
      <IonLabel>
        <IonText>{encounter.name}</IonText>
      </IonLabel>
      <IonNote color="danger">{encounter.weight}</IonNote>
    </IonItem>
  );
};
const MapView: React.FC<{ map: Region.Map }> = ({ map }) => {
  const tags = [map.region, ...map.tags];
  return (
    <IonCard key={map.name}>
      <IonCardHeader>
        <IonCardTitle>{map.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{tags && tags.map((t) => <IonChip key={t}>{t}</IonChip>)}</p>
        <IonText>
          <p>
            Length: {map.length[0]} - {map.length[1]}
          </p>
        </IonText>
      </IonCardContent>
      <IonAccordionGroup>
        <IonAccordion value="encounters">
          <IonItem slot="header">
            <IonLabel>Encounters</IonLabel>
          </IonItem>
          <IonList slot="content">
            {map.encounters.map((e) => (
              <EncounterView key={e.name} encounter={e} />
            ))}
          </IonList>
        </IonAccordion>
      </IonAccordionGroup>
    </IonCard>
  );
};

const regionTags = regions.map((r) => r.name);

function selectData(searchText: string, regions: string[], tags: string[]): Region.Map[] {
  const filteredByRegion = maps.filter((m) => !regions.length || regions.includes(m.region));
  console.log(`filteredByRegion`, filteredByRegion);
  const filteredByTags = filteredByRegion.filter(
    (m) => !m.tags || !tags.length || m.tags.some((t) => tags.includes(t))
  );
  console.log(`filteredByTags`, filteredByTags);
  const filteredByName = filteredByTags.filter((m) =>
    m.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );
  console.log(`filteredByName`, filteredByName);
  return filteredByName;
}

const Atlas: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTags, selectTags] = useState([] as string[]);
  const [selectedRegions, selectRegions] = useState([] as string[]);
  const filteredItems = useMemo(
    () => selectData(searchText, selectedRegions, selectedTags),
    [searchText, selectedRegions, selectedTags]
  );
  return (
    <IonPage id="wiki-atlas-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Wiki &gt; Atlas</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value!)} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Region</IonLabel>
            <IonSelect value={selectedRegions} multiple onIonChange={(e) => selectRegions(e.detail.value!)}>
              {regionTags.map((t) => (
                <IonSelectOption key={t} value={t}>
                  {t}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Tags</IonLabel>
            <IonSelect value={selectedTags} multiple onIonChange={(e) => selectTags(e.detail.value!)}>
              {tags.map((t) => (
                <IonSelectOption key={t} value={t}>
                  {t}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {filteredItems.map((m) => (
            <MapView key={m.name} map={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Atlas;

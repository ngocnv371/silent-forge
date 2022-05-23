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
} from '@ionic/react';
import originalMods, { tags as originalTags } from '../../data/modifiers';
import { Modifier, ModifierType } from '../../models/item';
import withFilter from './hoc/withFilter';

const Items: React.FC<{ items: Modifier[] }> = ({ items }) => {
  return (
    <>
      {items.map((mod) => (
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
    </>
  );
};

function selectData(searchText: string, tags: string[]): Modifier[] {
  return originalMods
    .filter(
      (m) =>
        m.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        m.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    )
    .filter(
      (m) =>
        !m.tags ||
        !tags.length ||
        tags.some((t) => t === m.type.toLocaleLowerCase()) ||
        m.tags.some((t) => tags.includes(t))
    );
}

const tagsWithAffixes = [
  ModifierType.Prefix.toLocaleLowerCase(),
  ModifierType.Suffix.toLocaleLowerCase(),
  ...originalTags,
];

export default withFilter(Items, 'Wiki > Mods', tagsWithAffixes, selectData);

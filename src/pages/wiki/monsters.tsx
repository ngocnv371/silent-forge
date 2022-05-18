import { IonCard, IonCardContent, IonCardHeader, IonChip, IonItem, IonLabel, IonText } from '@ionic/react';
import { BeastiaryEntry, entries, tags } from '../../data/monsters';
import withFilter from './hoc/withFilter';

const Monsters: React.FC<{ items: BeastiaryEntry[] }> = ({ items }) => {
  return (
    <>
      {items.map((monster) => (
        <IonCard key={monster.name}>
          <IonCardHeader style={{ padding: 0 }}>
            <IonItem>
              <IonLabel>{monster.name}</IonLabel>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            {monster.tags.map((t) => (
              <IonChip key={t}>{t}</IonChip>
            ))}
            <IonText>
              <p>{monster.description}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

function filterMonsters(searchText: string, tags: string[]): any[] {
  return entries
    .filter(
      (e) =>
        e.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        e.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    )
    .filter((m) => !tags.length || m.tags.some((t) => tags.includes(t)));
}

export default withFilter(Monsters, tags, filterMonsters);

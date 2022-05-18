import {
  IonChip,
  IonItem,
  IonLabel,
} from '@ionic/react';
import items, { tags } from '../../data/items';
import { Item } from '../../models/item';
import withFilter from './hoc/withFilter';

const Items: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <IonItem key={item.name}>
          <IonLabel>
            <h3>{item.name}</h3>
            <p>{item.tags && item.tags.map((t) => <IonChip key={t}>{t}</IonChip>)}</p>
          </IonLabel>
        </IonItem>
      ))}
    </>
  );
};

function selectData(searchText: string, tags: string[]): Item[] {
  return items
    .filter((m) => m.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    .filter((m) => !m.tags || !tags.length || m.tags.some((t) => tags.includes(t)));
}

export default withFilter(Items, tags, selectData);

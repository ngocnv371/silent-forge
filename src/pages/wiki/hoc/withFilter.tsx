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
} from '@ionic/react';
import { useMemo, useState } from 'react';

function withFilter(
  WrappedComponent: React.FC<{ items: any[] }>,
  title: string,
  tags: string[],
  selectData: (searchText: string, tags: string[]) => any[]
): React.FC {
  return () => {
    const [searchText, setSearchText] = useState('');
    const [selectedTags, selectTags] = useState([] as string[]);
    const filteredItems = useMemo(() => selectData(searchText, selectedTags), [searchText, selectedTags]);
    return (
      <IonPage id="wiki-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value!)} />
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
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
            <WrappedComponent items={filteredItems} />
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
}

export default withFilter;

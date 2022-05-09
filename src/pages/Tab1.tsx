import './Tab1.css';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { addTodo } from '../store/slices/todos';
import { increment } from '../store/slices/counter';
import { useDispatch } from 'react-redux';

const Tab1: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <strong>Try dispatch</strong>
          <button onClick={() => dispatch(addTodo({id: 1, title: 'asdfe'}))}>Click</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

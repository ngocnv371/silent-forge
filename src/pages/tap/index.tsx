import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonPage,
  IonProgressBar,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { exit, refresh } from 'ionicons/icons';
import { reset, tap } from '../../store/slices/tap';
import { useDispatch, useSelector } from 'react-redux';

import { useMemo } from 'react';

const Tap: React.FC = () => {
  const dispatch = useDispatch();
  const name = useSelector((state: any) => state.tap.name);
  const life = useSelector((state: any) => state.tap.life);
  const maxLife = useSelector((state: any) => state.tap.maxLife);
  const percentage = life / maxLife;
  const isDead = life < 1;
  const collectSection = useMemo(() => {
    return (
      isDead && (
        <section style={{ textAlign: 'center' }}>
          <IonButton size="large" color="primary">
            Collect Rewards
          </IonButton>
        </section>
      )
    );
  }, [isDead]);
  return (
    <IonPage id="tap-page">
      <IonContent fullscreen>
        <IonProgressBar style={{ height: '10px' }} color="danger" value={percentage}></IonProgressBar>
        <section style={{ textAlign: 'center' }}>
          <IonText color="primary">
            <h1>{name}</h1>
          </IonText>
          <IonText color="secondary">
            <h5>
              {life}/{maxLife}
            </h5>
          </IonText>
        </section>
        <section>
          <IonImg src="/assets/lil_chick.svg" onClick={() => dispatch(tap())} />
        </section>
        {collectSection}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton color="primary" onClick={() => dispatch(reset())}>
              <IonIcon slot="icon-only" icon={refresh} />
            </IonButton>
            <IonButton color="danger">
              <IonIcon slot="icon-only" icon={exit} /> Run
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tap;

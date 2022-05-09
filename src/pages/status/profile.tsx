import { IonAvatar, IonItem, IonLabel } from '@ionic/react';

import { useSelector } from 'react-redux';

const Profile: React.FC = () => {
  const data = useSelector((state: any) => state.profile);
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={data.avatarUrl} alt="avatar" />
      </IonAvatar>
      <IonLabel>
        <h3>{data.name}</h3>
        <p>{data.title}</p>
        <p>{data.motto}</p>
      </IonLabel>
    </IonItem>
  );
};

export default Profile;

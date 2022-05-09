import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { flame, flashOutline, personCircleOutline, settings } from 'ionicons/icons';

import { IonReactRouter } from '@ionic/react-router';
import Setting from './pages/setting';
import Skills from './pages/skills';
import Status from './pages/status';
import Tap from './pages/tap';
import Zones from './pages/zones';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/status">
            <Status />
          </Route>
          <Route path="/skills/:skillId/zones">
            <Zones />
          </Route>
          <Route exact path="/skills">
            <Skills />
          </Route>
          <Route exact path="/tap">
            <Tap />
          </Route>
          <Route exact path="/setting">
            <Setting />
          </Route>
          <Route exact path="/">
            <Redirect to="/status" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="status" href="/status">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Status</IonLabel>
          </IonTabButton>
          <IonTabButton tab="skills" href="/skills">
            <IonIcon icon={flame} />
            <IonLabel>Skills</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tap" href="/tap">
            <IonIcon icon={flashOutline} />
            <IonLabel>Tap</IonLabel>
          </IonTabButton>
          <IonTabButton tab="setting" href="/setting">
            <IonIcon icon={settings} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

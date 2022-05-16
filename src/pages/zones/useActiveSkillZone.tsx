import { useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { zones } from '../../data/regions';

export default function useActiveSkillZone(zoneId: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [activeZoneId, setActiveZoneId] = useState(zoneId);
  const [present] = useIonToast();
  // counting time to reward
  useEffect(() => {
    const activeZone = zones.find((z) => z.id === activeZoneId);
    if (!activeZone) {
      return;
    }
    const handle = setInterval(() => {
      console.log(`reward hit for zone #${activeZoneId}`);
      present({
          message: `reward hit for zone #${activeZoneId}`, 
          duration: 500,
          color: 'success',
      });
    }, activeZone.duration);
    return function cleanup() {
      clearInterval(handle);
    };
  }, [activeZoneId, present]);
  return [activeZoneId, setActiveZoneId];
}

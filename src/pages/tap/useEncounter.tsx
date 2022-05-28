import { useEffect, useState } from 'react';
import Atlas from '../../models/atlas';
import { maps } from '../../data/atlas';

function useEncounters(mapId: string) {
  const [map, setMap] = useState<Atlas.Map>();
  const [encounters, setEncounters] = useState([] as Atlas.EncounterInstance[]);

  useEffect(() => {
    const map = maps.find((m) => m.id === mapId);
    if (!map) {
      console.error(`map '${mapId}' not found`);
      return;
    }
    console.log(`found map`, map);
    setMap(map);
  }, [mapId]);

  useEffect(() => {
    if (!map) {
      return;
    }
    const list: Atlas.EncounterInstance[] = map.encounters.map((e) => ({ name: e.name, level: 15 }));
    setEncounters(list);
    console.log(`generated encounters`);
    console.table(list);
  }, [map]);
  return encounters;
}

export default useEncounters;

import { Drivers, Storage } from '@ionic/storage';

const store = new Storage({
  name: 'silent-forge',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
});

export async function createStorage() {
  return await store.create();
}

export default store;

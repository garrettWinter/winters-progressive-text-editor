import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// This is a function to update the local database with what has been saved into local storage.
export const putDb = async (content) => {
  console.log('PUT to the database');
  const putNotesDb = await openDB('jate', 1);
  const tx = putNotesDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// This reteives the notes saved in the local database
export const getDb = async () => {
  console.log('GET from the database');
  const getNotesDb = await openDB('jate', 1);
  const tx = getNotesDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  //This is logic that if no data is present it will return out of the function, else it will return what is saved in the DB.
  if (result){
    console.log('data retreived successfully')
  }
  else {
  console.log('NO DATA FOUND ')
  }
  return result?.value


}

initdb();

/* eslint-disable no-console */
export default function dataSave(storage, data) {
  if (typeof (Storage) !== 'undefined') {
    localStorage.setItem(storage, JSON.stringify(data));
  } else console.log('ERROR: No web storage support. Using a temporal storage instead');
}

export default function dataLoad(storage, oldStorage = null) {
  if (oldStorage !== null && localStorage.getItem(oldStorage)) {
    localStorage.removeItem(oldStorage);
  }
  if (localStorage.getItem(storage)) return JSON.parse(localStorage.getItem(storage));
  return null;
}

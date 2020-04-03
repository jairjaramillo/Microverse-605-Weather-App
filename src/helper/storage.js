/* eslint-disable no-console */
export default class Storage {
  constructor() {
    this.errorMessage = 'ERROR: No web storage support. Using a temporal storage instead';
  }

  static localLoad(storage, oldStorage = null) {
    if (oldStorage !== null && localStorage.getItem(oldStorage)) {
      localStorage.removeItem(oldStorage);
    }
    if (localStorage.getItem(storage)) return JSON.parse(localStorage.getItem(storage));
    return null;
  }

  static sessionLoad(storage, oldStorage = null) {
    if (oldStorage !== null && sessionStorage.getItem(oldStorage)) {
      sessionStorage.removeItem(oldStorage);
    }
    if (sessionStorage.getItem(storage)) return JSON.parse(sessionStorage.getItem(storage));
    return null;
  }

  static localSave(storage, data) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(storage, JSON.stringify(data));
      return true;
    }
    console.log(this.errorMessage);
    return false;
  }

  static sessionSave(storage, data) {
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.setItem(storage, JSON.stringify(data));
      return true;
    }
    console.log(this.errorMessage);
    return false;
  }
}

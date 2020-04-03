/* eslint-disable max-len */
/* eslint-disable no-console */

/**
 * Has a set of static functions that allows to save or load data from localStorage or sessionStorage.
 */
export default class Storage {
  constructor() {
    this.errorMessage = 'ERROR: No web storage support. Using a temporal storage instead';
  }

  /**
   * Looks for the storage value on your localStorage, and if it finds it, it returns it, otherwhise it returns NULL.
   * @param {String} storage The name of the storage in localStorage that will be loaded.
   * @param {String} oldStorage (Optional) The name of the storage in localStorage that will be deleted.
   */
  static localLoad(storage, oldStorage = null) {
    if (oldStorage !== null && localStorage.getItem(oldStorage)) {
      localStorage.removeItem(oldStorage);
    }
    if (localStorage.getItem(storage)) return JSON.parse(localStorage.getItem(storage));
    return null;
  }

  /**
   * Looks for the storage value on your sessionStorage, and if it finds it, it returns it, otherwhise it returns NULL.
   * @param {String} storage The name of the storage in sessionStorage that will be loaded.
   * @param {String} oldStorage (Optional) The name of the storage in sessionStorage that will be deleted.
   */
  static sessionLoad(storage, oldStorage = null) {
    if (oldStorage !== null && sessionStorage.getItem(oldStorage)) {
      sessionStorage.removeItem(oldStorage);
    }
    if (sessionStorage.getItem(storage)) return JSON.parse(sessionStorage.getItem(storage));
    return null;
  }

  /**
   * Checks if localStorage is available at the moment, and if does, saves the data into the selected storage.
   * @param {String} storage the name of the storage.
   * @param {Object} data the object that will be saved in the storage.
   */
  static localSave(storage, data) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(storage, JSON.stringify(data));
      return true;
    }
    console.log(this.errorMessage);
    return false;
  }

  /**
   * Checks if sessionStorage is available at the moment, and if does, saves the data into the selected storage.
   * @param {String} storage the name of the storage.
   * @param {Object} data the object that will be saved in the storage.
   */
  static sessionSave(storage, data) {
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.setItem(storage, JSON.stringify(data));
      return true;
    }
    console.log(this.errorMessage);
    return false;
  }
}

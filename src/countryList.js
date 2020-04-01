/* eslint-disable no-console */
// import Country from './country';

class CountryList {
  constructor() {
    if (localStorage.countries) this.countries = JSON.parse(localStorage.countries);
    else this.countries = [];
  }

  saveList() {
    if (typeof (Storage) !== 'undefined') {
      localStorage.countries = JSON.stringify(this.countries);
      return true;
    }
    console.log('ERROR: No web storage support. Using a temporal storage instead');
    return false;
  }

  getLast() {
    return this.countries[this.countries.length - 1];
  }

  addCountry(jsonData) {
    this.countries.push(jsonData);
    return this.saveList();
  }

  removeCountry(index) {
    this.countries.splice(index, 1);
    return this.saveList();
  }

  removeLast() {
    return this.removeCountry(this.countries.length - 1);
  }
}

export default CountryList;

/* eslint-disable no-console */
class Countries {
  constructor() {
    if (sessionStorage.countries) this.countries = JSON.parse(sessionStorage.countries);
    else this.countries = [];
  }

  saveList() {
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.countries = JSON.stringify(this.countries);
      return true;
    }
    console.log('ERROR: No web storage support. Using a temporal storage instead');
    return false;
  }

  addCountry(country) {
    this.countries.push(country);
    return this.saveList();
  }

  removeCountry(index) {
    this.countries.splice(index, 1);
    return this.saveList();
  }
}

export default Countries;

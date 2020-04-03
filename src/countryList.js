export default class CountryList {
  constructor() {
    if (localStorage.countries) this.countries = JSON.parse(localStorage.countries);
    else this.countries = [];
  }

  saveList(array = this.countries) {
    if (typeof (Storage) !== 'undefined') localStorage.countries = JSON.stringify(array);
    // eslint-disable-next-line no-console
    else console.log('ERROR: No web storage support. Using a temporal storage instead');
  }

  getLast(array = this.countries) { return array[array.length - 1]; }

  addCountry(jsonData, array = this.countries) {
    array.push(jsonData);
    this.saveList();
  }

  removeCountry(index, array = this.countries) {
    array.splice(index, 1);
    this.saveList();
  }

  removeLast(array = this.countries) { this.removeCountry(array.length - 1); }
}

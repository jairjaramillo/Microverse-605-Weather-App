import dataLoad from './helper/dataLoad';
import dataSave from './helper/dataSave';

export default class CountryList {
  constructor() {
    this.countries = dataLoad('countryStorage', 'countries');
    if (this.countries === null) this.countries = [];
  }

  getLast(array = this.countries) { return array.length - 1; }

  addCountry(jsonData, array = this.countries, storage = 'countryStorage') {
    array.push(jsonData);
    dataSave(storage, array);
  }

  removeCountry(index, array = this.countries, storage = 'countryStorage') {
    array.splice(index, 1);
    dataSave(storage, array);
  }

  removeLast(array = this.countries) { this.removeCountry(array.length - 1); }
}

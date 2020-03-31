/* eslint-disable class-methods-use-this */
import create from './helper/create';

class Control {
  constructor(Countries) {
    this.countryList = Countries;
    this.renderList(this.countryList);
    document.getElementById('add-form').onsubmit = (e) => {
      e.preventDefault();
      this.countryList.addCountry(document.forms['add-form'][0].value);
      this.renderList(this.countryList);
      document.getElementById('add-form').reset();
    };
  }

  renderList() {
    const countryList = document.getElementById('country-list');
    countryList.innerHTML = '';
    for (let i = 0; i < this.countryList.countries.length; i += 1) {
      const countryBlock = create(countryList, 'list-group-item', `country-${i}`);
      countryBlock.innerHTML = this.countryList.countries[i];
      document.getElementById(`country-${i}`).onclick = () => {
        this.cleanActive();
        countryBlock.classList.add('active-block');
      };
    }
  }

  cleanActive() {
    for (let i = 0; i < this.countryList.countries.length; i += 1) {
      const currentElement = document.getElementById(`country-${i}`);
      currentElement.classList.remove('active-block');
    }
  }
}

export default Control;

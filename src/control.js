/* eslint-disable no-console */
import create from './helper/create';
// import weatherKey from './helper/weatherKey';

class Control {
  constructor(Countries) {
    this.countryList = Countries;
    this.renderList(this.countryList);
    document.getElementById('add-form').onsubmit = (e) => {
      e.preventDefault();
      this.countryList.addCountry(document.forms['add-form'][0].value);
      this.renderList(this.countryList);
      document.getElementById('add-form').reset();
      fetch('http://api.openweathermap.org/data/2.5/weather?q=Puebla&APPID=de3a09c0785c29e8bad620782f544372', { mode: 'cors' })
        .then((response) => {
          console.log(response.json());
        })
        .catch((err) => {
          console.log(err);
        });
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
        this.renderWeather(i);
      };
    }
  }

  renderWeather(index) {
    const weatherShow = document.getElementById('weather-show');
    weatherShow.innerHTML = '';
    const weatherBlock = create(weatherShow);
    weatherBlock.innerHTML = this.countryList.countries[index];
  }

  cleanActive() {
    for (let i = 0; i < this.countryList.countries.length; i += 1) {
      const currentElement = document.getElementById(`country-${i}`);
      currentElement.classList.remove('active-block');
    }
  }
}

export default Control;

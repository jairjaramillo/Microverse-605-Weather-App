/* eslint-disable no-console */
import create from './helper/create';
import weatherKey from './helper/weatherKey';
import newsKey from './helper/newsKey';

class Control {
  constructor(CountryList) {
    this.countryList = CountryList;
    this.renderList();
    this.addButtonEv();
  }

  renderList() {
    const countryList = document.getElementById('country-list');
    countryList.innerHTML = '';
    for (let i = 0; i < this.countryList.countries.length; i += 1) {
      const countryBlock = create(countryList, 'list-group-item', `country-${i}`);
      countryBlock.innerHTML = this.countryList.countries[i].name;
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
    const weatherBlock = create(weatherShow, 'row');
    const weatherLeft = create(weatherBlock, 'col-8');
    const weatherName = create(weatherLeft, 'h2 wave-name');
    weatherName.innerHTML = this.countryList.countries[index].name;
    const weatherDescription = create(weatherLeft, 'wave-desc');
    weatherDescription.innerHTML = this.countryList.countries[index].description;
    const weatherRight = create(weatherBlock, 'col-4');
    const weatherPic = create(weatherRight, 'mx-auto d-block', '', 'img');
    weatherPic.setAttribute('src', `http://openweathermap.org/img/wn/${this.countryList.countries[index].icon}.png`);

    this.renderNews(index);
  }

  renderNews(index) {
    const newsShow = document.getElementById('news-show');
    newsShow.innerHTML = '';
    const url = `http://newsapi.org/v2/everything?q=${this.countryList.countries[index].name}&from=2020-03-01&sortBy=popularity&apiKey=${newsKey()}`;
    fetch(url, { mode: 'cors' })
      .then((response) => {
        response.json().then((data) => {
          console.log(data.articles);
          for (let i = 0; i < 5; i += 1) {
            const newsBlock = create(newsShow, 'my-3');
            const newsTitle = create(newsBlock, 'link', '', 'a');
            newsTitle.textContent = `${data.articles[i].title}`;
            newsTitle.setAttribute('href', `${data.articles[i].url}`);
            newsTitle.setAttribute('target', '_blank');
            const newsSource = create(newsBlock);
            const newsSourceName = create(newsSource, 'font-italic', '', 'small');
            newsSourceName.textContent = `(${data.articles[i].source.name})`;
            const newsDescription = create(newsBlock, 'small');
            newsDescription.textContent = `${data.articles[i].description}`;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cleanActive() {
    for (let i = 0; i < this.countryList.countries.length; i += 1) {
      const currentElement = document.getElementById(`country-${i}`);
      currentElement.classList.remove('active-block');
    }
  }

  addButtonEv() {
    document.getElementById('add-form').onsubmit = (e) => {
      e.preventDefault();
      const fetchString = `http://api.openweathermap.org/data/2.5/weather?q=${document.forms['add-form'][0].value}&APPID=${weatherKey()}`;
      fetch(fetchString, { mode: 'cors' })
        .then((response) => {
          response.json().then((data) => {
            this.countryList.addCountry({
              id: data.sys.id,
              name: data.name,
              country: data.sys.country,
              lon: data.coord.lon,
              lat: data.coord.lat,
              weatherId: data.weather[0].id,
              weather: data.weather[0].main,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            });
            this.renderList();
          });
        })
        .catch((err) => {
          console.log(err);
        });
      document.getElementById('add-form').reset();
    };
  }
}

export default Control;

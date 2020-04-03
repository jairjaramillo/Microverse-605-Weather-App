import create from './helper/create';
import fetchWeather from './fetchWeather';
import fetchNews from './fetchNews';

export default class Render {
  constructor(CountryList) {
    if (localStorage.temp) this.type = JSON.parse(localStorage.temp);
    else this.type = 1;

    this.countryList = CountryList;
    this.renderList();
    this.renderTemp();

    document.getElementById('add-form').onsubmit = (e) => {
      e.preventDefault();
      this.createCountry(document.forms['add-form'][0].value, this.type);
      document.getElementById('add-form').reset();
    };

    document.getElementById('change-c').onclick = () => {
      this.type = 1;
      this.saveTemp();
      this.renderTemp();
    };

    document.getElementById('change-f').onclick = () => {
      this.type = 2;
      this.saveTemp();
      this.renderTemp();
    };
  }

  saveTemp(data = this.type) {
    if (typeof (Storage) !== 'undefined') localStorage.temp = JSON.stringify(data);
    // eslint-disable-next-line no-console
    else console.log('ERROR: No web storage support. Using a temporal storage instead');
  }

  renderTemp() {
    if (this.type === 1) {
      document.getElementById('change-c').classList.add('btn-active');
      document.getElementById('change-f').classList.remove('btn-active');
    } else {
      document.getElementById('change-f').classList.add('btn-active');
      document.getElementById('change-c').classList.remove('btn-active');
    }
  }

  cleanActive(array = this.countryList.countries) {
    for (let i = 0; i < array.length; i += 1) {
      const currentElement = document.getElementById(`country-${i}`);
      currentElement.classList.remove('active-block');
    }
  }

  renderList(countryList = this.countryList) {
    const domList = document.getElementById('country-list');
    domList.innerHTML = '';
    for (let i = 0; i < countryList.countries.length; i += 1) {
      const countryBlock = create(domList, 'list-group-item', `country-${i}`);
      const countryItem = create(countryBlock, 'row');
      const countryLeft = create(countryItem, 'col-10');
      const countryRight = create(countryItem, 'col-2', `delete-${i}`);
      countryRight.innerHTML = '<i class="fas fa-times"></i>';
      countryLeft.innerHTML = countryList.countries[i][0].name;
      document.getElementById(`country-${i}`).onclick = () => {
        this.cleanActive();
        countryBlock.classList.add('active-block');
        this.renderWeather(i);
      };
      document.getElementById(`delete-${i}`).onclick = () => {
        this.cleanActive();
        countryList.removeCountry(i);
        this.renderList();
      };
    }
  }

  async renderWeather(index, weatherData = this.countryList.countries[index]) {
    const weatherShow = document.getElementById('weather-show');
    weatherShow.innerHTML = '';

    const weatherBlock = create(weatherShow, 'row');
    const weatherLeft = create(weatherBlock, 'col-8');
    const weatherName = create(weatherLeft, 'h2 wave-name');
    weatherName.innerHTML = weatherData[0].name;
    const weatherDescription = create(weatherLeft, 'wave-desc');
    weatherDescription.innerHTML = `${weatherData[0].weather[0].description} -
      ${weatherData[0].main.temp} ${weatherData[1] === 1 ? 'C&#176' : 'F&#176'}`;
    const weatherRight = create(weatherBlock, 'col-4');
    const weatherPic = create(weatherRight, 'mx-auto d-block', '', 'img');
    weatherPic.setAttribute('src', `http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}.png`);

    const data = await fetchNews(weatherData[0].name);
    this.renderNews(data);
  }

  // eslint-disable-next-line class-methods-use-this
  renderNews(newsData) {
    const newsShow = document.getElementById('news-show');
    newsShow.innerHTML = '';

    for (let i = 0; i < 5; i += 1) {
      const newsBlock = create(newsShow, 'my-3');
      const newsTitle = create(newsBlock, 'link', '', 'a');
      newsTitle.textContent = `${newsData.articles[i].title}`;
      newsTitle.setAttribute('href', `${newsData.articles[i].url}`);
      newsTitle.setAttribute('target', '_blank');
      const newsSource = create(newsBlock);
      const newsSourceName = create(newsSource, 'font-italic', '', 'small');
      newsSourceName.textContent = `(${newsData.articles[i].source.name})`;
      const newsDescription = create(newsBlock, 'small');
      newsDescription.textContent = `${newsData.articles[i].description}`;
    }
  }

  async createCountry(country, unit = 1, countryList = this.countryList) {
    const data = await fetchWeather(country, unit);
    countryList.addCountry(data);
    this.renderList();

    document.getElementById('add-form').reset();
  }
}

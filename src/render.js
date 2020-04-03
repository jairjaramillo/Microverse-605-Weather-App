import create from './helper/create';
import fetchWeather from './fetchWeather';
import fetchNews from './fetchNews';

export default class Render {
  constructor(CountryList) {
    this.countryList = CountryList;
    this.renderList();
    this.addButtonEv();
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
      countryLeft.innerHTML = countryList.countries[i].name;
      document.getElementById(`country-${i}`).onclick = () => {
        this.cleanActive();
        countryBlock.classList.add('active-block');
        this.renderWeather(i);
        // this.renderNews(fetchNews(countryList.countries[i].name));
      };
      document.getElementById(`delete-${i}`).onclick = () => {
        this.cleanActive();
        countryList.removeCountry(i);
        this.renderList();
      };
    }
  }

  renderWeather(index, unit = 1, weatherData = this.countryList.countries[index]) {
    const weatherShow = document.getElementById('weather-show');
    weatherShow.innerHTML = '';

    const weatherBlock = create(weatherShow, 'row');
    const weatherLeft = create(weatherBlock, 'col-8');
    const weatherName = create(weatherLeft, 'h2 wave-name');
    weatherName.innerHTML = weatherData.name;
    const weatherDescription = create(weatherLeft, 'wave-desc');
    weatherDescription.innerHTML = `${weatherData.weather[0].description} -
      ${weatherData.main.temp} ${unit === 1 ? 'C°' : 'F°'}`;
    const weatherRight = create(weatherBlock, 'col-4');
    const weatherPic = create(weatherRight, 'mx-auto d-block', '', 'img');
    weatherPic.setAttribute('src', `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);

    // this.renderNews(weatherData.name);
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

  async addButtonEv(countryList = this.countryList) {
    document.getElementById('add-form').onsubmit = (e) => {
      e.preventDefault();
      const query = document.forms['add-form'][0].value;
      const data = fetchWeather(query);
      countryList.addCountry(fetchWeather(query));
      this.renderList();

      document.getElementById('add-form').reset();
    };
  }
}

import newsKey from './helper/newsKey';

export default async function fetchNews(query) {
  try {
    const fetchString = `http://newsapi.org/v2/everything?q=${query}&from=2020-03-01&sortBy=popularity&apiKey=${newsKey()}`;
    const fetchData = await fetch(fetchString, { mode: 'cors' });
    const data = await fetchData.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return null;
  }
}

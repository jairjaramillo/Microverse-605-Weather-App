import newsKey from './helper/newsKey';

export default async function fetchNews(query) {
  try {
    const fetchString = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${newsKey()}`;
    const fetchData = await fetch(fetchString, { mode: 'cors' });
    const data = await fetchData.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return null;
  }
}

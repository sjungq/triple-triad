const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
const BASE_URL = 'https://xivapi.com';
const BASE_IMAGE_INDEX = 82101;

//axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common = {
  private_key: process.env.private_key,
};

const getData = async (url, page = 0) => {
  const originalUrl = `${BASE_URL}/${url}`;
  const separator = originalUrl.includes('?') ? '&' : '?';
  const pagePart = page ? `&page=${page}` : '';
  //console.log(`${originalUrl}${separator}limit=3000${pagePart}`);
  let res = await axios.get(`${originalUrl}${separator}limit=3000${pagePart}`);
  return res.status === 200 ? res.data : Promise.reject(new Error());
};

const printCardData = (cardData) => {
  console.log(cardData.name);
  console.log('Stats:', cardData.values);
  console.log('Rank:', cardData.rank.Stars);
  console.log('Url:', cardData.url);
};

const toIconId = (iconId, hr = true) => {
  const iconIdStr = iconId.toString();
  return iconIdStr.padStart(6, '0') + (hr ? '_hr1' : '');
};

const urlOfIcon = (iconId, hr = true) => {
  return `${toIconId(iconId, hr)}.png`;
};

const getDataList = async (url) => {
  let data = [];
  let page = 1;
  let total = 0;
  let res = '';
  do {
    res = await getData(url, page);
    data = data.concat(res.Results);
    page = res.Pagination.PageNext ?? 0;
    total = res.Pagination.ResultsTotal ?? 0;
  } while (page);

  if (data.length !== total) {
    console.error('expected: ' + total + ' actual: ' + data.length);
  }

  return data;
};

getDataList('TripleTriadCard')
  .then((cardList) => {
    getDataList(
      `TripleTriadCardResident?columns=Top,Bottom,Left,Right,ID,TripleTriadCardRarity`
    )
      .then((data) => {
        let meow = cardList.map((card, index) => ({
          name: card.Name,
          id: card.ID,
          values: [
            data[index].Top,
            data[index].Bottom,
            data[index].Left,
            data[index].Right,
          ],
          rank: data[index].TripleTriadCardRarity
            ? data[index].TripleTriadCardRarity.Stars
            : 0,
          url: `${urlOfIcon(BASE_IMAGE_INDEX + index, false)}`,
        }));

        // for (const c of meow) {
        //   printCardData(c);
        // }
        fs.writeFile(
          'testCards.json',
          JSON.stringify({ cards: meow }),
          (err) => {
            if (err) console.log(err);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

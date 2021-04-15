const fetch = require('node-fetch');
const { BigNumber } = require('bignumber.js');
const moment = require('moment');

const query = `
  query event {
    event(where: {section: {_eq: "faucets"}, method: {_eq: "Dripped"}, _and: {timestamp: {_gte: "1618322400"}, _and: {timestamp: {_lte: "1618498800"}}}}, order_by: {timestamp: asc}) {
      block_number
      section
      method
      data
      timestamp
    }
  }`;

const nodeWs = 'https://subsocial.polkastats.io/api/v3';

fetch(nodeWs, {
  method: 'POST',
  body: JSON.stringify({query}),
}).then(res => res.text())
  .then(body => {
    JSON.parse(body).data.event.forEach(event => {
      console.log(`'${event.block_number}','${event.section}','${event.method}','${event.data}','${event.timestamp}','${moment.unix(event.timestamp).utc().format("DD-MM-YYYY H:mm:ss")}'`);
    });
    
  })
  .catch(error => console.error(error));
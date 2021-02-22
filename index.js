const fetch = require('node-fetch');
const { BigNumber } = require('bignumber.js');

const query = `
  query MyQuery {
    event(where: {section: {_eq: "claims"}, method: {_eq: "Claimed"}}, order_by: {block_number: asc}) {
      block_number
      data
    }
  }`;

fetch('https://kusama.polkastats.io/api/v3', {
  method: 'POST',
  body: JSON.stringify({query}),
}).then(res => res.text())
  .then(body => {
    // console.log(JSON.stringify(JSON.parse(body).data.event, null, 2));
    JSON.parse(body).data.event.forEach(event => {
      const data = JSON.parse(event.data);
      // console.log(`block: ${event.block_number}, kusama address: ${data[0]}, ethereum address: ${data[1]}, amount: ${data[2]}`);
      console.log(`${event.block_number},${data[0]},${data[1]},${new BigNumber(data[2]).toString(10)}`);
    });
    
  })
  .catch(error => console.error(error));
const fetch = require('node-fetch');
const { BigNumber } = require('bignumber.js');

const query = `
  query account {
    account(where: { free_balance: { _lt: 200000000000 } }, order_by: {free_balance: asc}) {
      account_id
      available_balance
      free_balance
      locked_balance
    }
  }`;

const nodeWs = 'https://subsocial.polkastats.io/api/v3';

fetch(nodeWs, {
  method: 'POST',
  body: JSON.stringify({query}),
}).then(res => res.text())
  .then(body => {
    JSON.parse(body).data.account.forEach(account => {
      console.log(`${account.account_id},${account.available_balance},${account.free_balance},${account.locked_balance}`);
    });
    
  })
  .catch(error => console.error(error));
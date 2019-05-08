const fetch = require('node-fetch');

const options = {
  headers: {
    Accept: 'application/json',
    'User-Agent': 'maiarafa10',
  },
};

const getDadJoke = () => new Promise((resolve, reject) => {
  fetch(process.env.JOKES_API_URL, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error));
});

module.exports = {
  getDadJoke,
};

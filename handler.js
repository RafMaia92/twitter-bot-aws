'use strict';

const { getDadJoke } = require('./helpers/jokes');
const { tweetJoke } = require('./helpers/twitter');

module.exports.bot = (event, context, callback) => {
 
  getDadJoke()
   
    .then((json) => {
    
      if (json.status !== 200) {
        return callback(null, { statusCode: json.status, body: JSON.stringify({ error: 'Could not fetch a joke' }) });
      }

      
      const { joke } = json;
      
      tweetJoke(joke)
        .then((response) => { 
          return callback(null, { statusCode: json.status, body: JSON.stringify({ message: response }) });
        })
        .catch((error) => {
          console.error(error);
          return callback(null, { statusCode: 500, body: JSON.stringify({ error }) });
        });
    })
    .catch((error) => {
      console.error(error);
      return callback(null, { statusCode: 500, body: JSON.stringify({ error }) });
    });
};

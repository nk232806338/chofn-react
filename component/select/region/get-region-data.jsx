var React = require('react');
var API = require('../../api');
var axios = require('axios');
var cached = null;
module.exports = function(input, callback) {
  setTimeout(function() {
    if (cached) {
      callback(null, {
        options: cached,
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true
      });
    } else {
      axios.post(API.getRegion, '', {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(response => {
        cached = response.data.body.data;
        callback(null, {
          options: cached,
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        });
        return {
          options: cached,
        };
      });
    }
  }, 10);
};
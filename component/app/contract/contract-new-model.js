var API = require('../../api');
var axios = require('axios');

function getProposers(customerId) {
  return  axios.post(API.getProposers, 'customerId=' + customerId, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
}

function getBailors(customerId) {
  return axios.post(API.getBailors, 'customerId=' + customerId, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
}

function getContacts(customerId) {
  return axios.post(API.getContacts, 'customerId=' + customerId, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
}

module.exports = function (customerId) {
  return axios.all([getProposers(customerId), getBailors(customerId), getContacts(customerId)])
    .then(axios.spread(function (proposers, bailors, contacts) {
      return {
        proposersArray: proposers.data.body.data,
        bailorsArray: bailors.data.body.data,
        contactsArray: contacts.data.body.data,
      };
    }));
};

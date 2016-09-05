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

function getContractDetail(contractDetailId) {
  return axios.post(API.getContractDetail, 'id=6', {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
}

module.exports = function (customerId, contractDetailId) {
  return axios.all([
    getProposers(customerId), getBailors(customerId), getContacts(customerId), getContractDetail()]
  )
    .then(axios.spread(function (proposers, bailors, contacts /*联系人*/, contracts /*合同*/) {
      return {
        proposersArray: proposers.data.body.data,
        bailorsArray: bailors.data.body.data,
        contactsArray: contacts.data.body.data,
        contractDetail: contracts && contracts.data.body.data
      };
    }));
};

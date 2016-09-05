var React = require('react');
var ReactDOM = require('react-dom');
var Contract = require('./component/app/contract/contract-main');
var axios = require('axios');
var API = require('./component/api');
var App = React.createClass({
  getInitialState() {
    return {
      alertShow: false
    }
  },
  componentDidMount() {
    axios.post('http://patent.test.chofn.net/index/index/', 'username=lucy&password=zz123asd', {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function () {
      axios.post('http://patent.test.chofn.net/customer/index/', 'page=1&pageSize=15', {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  },
  render() {
    return (
      <div>
        <Contract />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-container'));




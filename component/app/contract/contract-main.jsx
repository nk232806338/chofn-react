var React = require('react');
var ContractAgent = require('./contract-agent');
var ContractMain = React.createClass({
  render() {
    return (<div>
      <ContractAgent />
    </div>);
  }
});

module.exports = ContractMain;
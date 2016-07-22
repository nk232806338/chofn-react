var React = require('react');
var ContractAgent = require('./contract-agent');
var ContractNew = require('./contract-new');
var ContractMain = React.createClass({
  render() {
    return (<div>
      <ContractNew />
    </div>);
  }
});

module.exports = ContractMain;
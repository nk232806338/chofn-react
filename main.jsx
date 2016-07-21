var React = require('react');
var ReactDOM = require('react-dom');
// var SelectBase = require('./component/select/select-base.jsx');
// var Register = require('./component/app/register');
var Contract = require('./component/app/contract/contract-main');
var App = React.createClass({
  render() {
    return (
      <div>
        <Contract />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-container'));




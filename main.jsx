var React = require('react');
var ReactDOM = require('react-dom');
var SelectBase = require('./component/select/select-base.jsx');
var Register = require('./component/app/register');
var App = React.createClass({
  render() {
    return (
      <div>
        <Register />
        <div className="holder" style={{height: '600px'}}></div>
        <div className="wrapper" style={{width: '300px', marginLeft: '10px'}}>
          <SelectBase />
        </div>
        <div className="holder" style={{height: '600px'}}></div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-container'));




var React = require('react');
require('./alert.less');
var Alert = React.createClass({

  render() {
    return (
      <div className="alert alert-danger" role="alert">
        <button type="button" className="close">
          <span aria-hidden="true">&times;</span>
        </button>
        错误提升啊啊啊啊
      </div>
    );
  }
});

module.exports = Alert;
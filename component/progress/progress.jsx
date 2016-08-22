var React = require('react');
require('./progress.less');
var Progress = React.createClass({
  props: {
    data: React.PropTypes.number
  },
  render() {
    var { data } = this.props;
    return (
      <div className="progress">
        <div
          className="progress-bar" role="progressbar" aria-valuenow="60"
          aria-valuemin="0" aria-valuemax="100" style={{width: data+'%'}}
        >
          <span className="sr-only">{data}% Complete</span>
        </div>
      </div>
    );
  }
});

module.exports = Progress;



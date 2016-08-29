var React = require('react');
var classnames = require('classnames');
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('./alert.less');
var TYPE = {
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  WARNING: 'WARNING',
  DANGER: 'DANGER',
  LOADING: 'LOADING'
};
/**
 * @type {__React.ClassicComponentClass<P>}
 * @desc Alert提示Component
 */
var Alert = React.createClass({
  statics: {
    ...TYPE
  },
  propTypes: {
    type: React.PropTypes.string
  },
  render() {
    var { type } = this.props;
    var className = classnames('alert', {
      'alert-danger': type == TYPE.DANGER,
      'alert-warning': type == TYPE.WARNING,
      'alert-info': type == TYPE.INFO,
      'alert-success': type == TYPE.SUCCESS,
    });
    if (type == TYPE.LOADING) {
      return (
        <div className="alert alert-info">
          Loading....
        </div>
      );
    }
    return (
      <div className={className}>
        <button type="button" className="close">
          <span aria-hidden="true">&times;</span>
        </button>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Alert;
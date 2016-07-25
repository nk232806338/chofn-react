var React = require('react');
var classNames = require('classnames');
var InputBase = require('./Form-item-base');
var loadingIcon = require('../../assets/img/loading.gif');
require('./input-async-valid.less');
var STATUS = {
  'NONE': 0,
  'LOADING': 1,
  'VALID_YES': 2,
  'VALID_FAILED': 3
};

var InputAsyncValid = React.createClass({
  propTypes: {
    children: React.PropTypes.any
  },
  getInitialState() {
    return {
      status: STATUS.NONE
    }
  },
  handleBlur(value, isValid) {
    if (isValid && value != this.currentValid) {
      this.setState({
        status: STATUS.LOADING
      });
      window.setTimeout(() => {
        this.currentValid = value;
        this.setState({
          status: STATUS.VALID_YES
        });
      }, 2000);
      window.setTimeout(() => {
        this.setState({
          status: STATUS.NONE
        });
      }, 5000);
      console.info(value);
    }
  },
  renderLoader() {
    var { status } = this.state;
    if (status == STATUS.LOADING) {
      return <span className="async-tips loading-img"><img src={loadingIcon}/>检查中...</span>;
    }
    if (status == STATUS.VALID_YES) {
      return <span className="async-tips valid-yes">恭喜,改该邮箱帐号可用</span>;
    }
    return null;
  },
  render() {
    var { status } = this.state;
    return (<div className={classNames('Input-async-valid', 'clearfix', {async: status > 0})}>
      <InputBase {...this.props} handleBlur={this.handleBlur} disabled={status == 1 ? 'disabled' : null}/>
      {this.renderLoader()}
    </div>);
  }
});

module.exports = InputAsyncValid;
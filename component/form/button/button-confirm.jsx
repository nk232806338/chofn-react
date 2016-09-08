var React = require('react');
var classNames = require('classnames');
require('./button-confirm.less');
var ButtonConfirm = React.createClass({
  propTypes: {
    onYes: React.PropTypes.func,
    onNo: React.PropTypes.func,
    title: React.PropTypes.string
  },
  getInitialState() {
    return {
      toggleConfirm: false
    };
  },
  componentDidMount() {
    document.body.addEventListener('click', this._clickDocument, false);
  },
  componentWillUnmount() {
    document.body.removeEventListener('click', this._clickDocument, false);
  },
  _clickDocument(event) {
    if (this.refs.Btn.contains(event.target)) {
      return false;
    }
    this.setState({
      toggleConfirm: false
    });
  },
  showConfirm() {
    this.setState({
      toggleConfirm: !this.state.toggleConfirm
    });
  },
  onYes(event) {
    this.setState({
      toggleConfirm: false
    });
    var { onYes } = this.props;
    if (onYes) onYes(event);
  },
  onNo(event) {
    this.setState({
      toggleConfirm: false
    });
    var { onNo } = this.props;
    if (onNo) onNo(event);
  },
  stopPropagation(event) {
    event.stopPropagation();
  },
  render() {
    var { toggleConfirm } = this.state;
    var { children } = this.props;
    return (<div className="Btn-confirm" ref="Btn" onClick={this.stopPropagation}>
      <button type="button" className="btn btn-default" onClick={this.showConfirm}>
        {children}
      </button>
      <div className={classNames('confirm-trans', {'show': toggleConfirm})}>
        <div className="confirm-wrapper">
          <a className="btn yes" onClick={this.onYes}>确认</a>
          <a className="btn no" onClick={this.onNo}>取消</a>
        </div>
      </div>
    </div>);
  }
});

module.exports = ButtonConfirm;
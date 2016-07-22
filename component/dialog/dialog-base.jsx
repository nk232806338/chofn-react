var React = require('react');
require('./dialog.less');
var DialogBase = React.createClass({
  propTypes: {
    align: React.PropTypes.string,
    width: React.PropTypes.string,
    onClose: React.PropTypes.func,
    title: React.PropTypes.string
  },
  onClose() {
    var { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  },
  render() {
    var { align, width, title } = this.props;
    return (<div className={'Dialog-base ' + align}>
      <div className="Dialog-overlayer" onClick={this.onClose}></div>
      <div className="Dialog-box" style={{width: width + 'px'}}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              <span className="title-content">{title ? title : null}</span>
              <i onClick={this.onClose}><span className="glyphicon glyphicon-remove-sign"/></i>
            </h3>
          </div>
          <div className="panel-body">
            {this.props.children}
          </div>
        </div>
      </div>
    </div>);
  }
});

module.exports = DialogBase;
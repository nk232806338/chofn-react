var React = require('react');
var ReactDOM = require('react-dom');
var ButtonConfirm = require('../../../component/form/button/button-confirm');
var ButtonExample = React.createClass({
  getInitialState() {
    return {
      msg: ''
    }
  },
  onYes(title) {
    this.setState({
      msg: '确认' + title
    });
  },
  onNo(title) {
    this.setState({
      msg: '取消' + title
    });
  },
  render() {
    var { msg } = this.state;
    return (<div ref="">
      <div className="panel panel-default">
        <div className="panel-heading">带确认的按钮</div>
        <div className="panel-body">
          <ButtonConfirm onYes={() => {this.onYes('删除')}} onNo={() => {this.onNo('删除')}} title="删除" />
          <div style={{marginBottom: '10px'}}></div>
          <ButtonConfirm onYes={() => {this.onYes('发送')}} onNo={() => {this.onNo('发送')}} title="发送" />
          <div style={{marginBottom: '10px'}}></div>
          <ButtonConfirm onYes={() => {this.onYes('添加')}} onNo={() => {this.onNo('添加')}} title="添加" />
          <div style={{marginBottom: '10px'}}></div>
          <span style={{marginTop: '10px', 'display': 'block'}}>{msg}</span>
        </div>
      </div>

    </div>);
  }
});

module.exports = ButtonExample;
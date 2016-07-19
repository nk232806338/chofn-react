var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
require('./select-base.less');
var testData = [
  {id: 1, name: '北京2', value: 1},
  {id: 2, name: '上海4', value: 2},
  {id: 3, name: '广州', value: 3},
  {id: 4, name: '深圳', value: 4},
  {id: 5, name: '辽宁', value: 5},
  {id: 6, name: '辽宁', value: 5},
  {id: 7, name: '辽宁', value: 5},
  {id: 8, name: '辽宁', value: 5},
  {id: 9, name: '辽宁', value: 5},
  {id: 10, name: '辽宁', value: 5},
  {id: 11, name: '辽宁', value: 5},
];
var SelectBase = React.createClass({
  getInitialState() {
    return {
      showChild: false,
      data: testData,
      selectedItem: null,
      unfoldUp: false
    };
  },
  toggle(action) {
    this.showUpOrDown();
    if (Object.prototype.toString.call(action) == '[object Boolean]') {
      this.setState({
        showChild: action
      });
    } else {
      this.setState(function (previousState, currentProps) {
        return {
          showChild: !previousState.showChild
        }
      });
    }
  },
  showUpOrDown() {
    var selectDOM = this.refs.select_mod;
    if (selectDOM.getBoundingClientRect().top <= window.innerHeight/2 + window.scrollY) {
      this.setState({
        unfoldUp: false
      });
    } else {
      this.setState({
        unfoldUp: true
      });
    }
  },
  onSelect(item) {
    this.setState({
      selectedItem: item,
      showChild: false
    });
  },
  render() {
    var { showChild, data, selectedItem, unfoldUp } = this.state;
    return (<div className="Select" ref="select_mod">
      <div className="Select-control" onClick={this.toggle}>
        <div className="Select-value">
          {selectedItem ? <span>{selectedItem.name}</span> : <span>请选择</span>}
        </div>
      </div>
      { showChild ? <div className={classNames('Select-children', {'unfold-up': unfoldUp})}>
        {data.map(item => <div className="option-item" onClick={event => this.onSelect(item, event)} key={item.id}>{item.name}</div>)}
      </div> : null}
    </div>);
  }
});

module.exports = SelectBase;
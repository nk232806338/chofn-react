var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
require('./select-base.less');

var SelectBase = React.createClass({
  propTypes: {
    data: React.PropTypes.any,
    keyName: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    defaultSelect: React.PropTypes.any,
  },
  getInitialState() {
    var { data, defaultSelect } = this.props;
    _.each(data, item => {
      if (!item.id) item.id = _.uniqueId('select-data-id');
    });
    return {
      showChild: false,
      data,
      selectedItem: defaultSelect ?  data[0] : _.find(data, {active: true}),
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
    var { onSelect } = this.props;
    if (onSelect) onSelect(item);
  },
  render() {
    var { keyName, defaultSelect } = this.props;
    var { showChild, data, selectedItem, unfoldUp } = this.state;
    return (<div className="Select-base" ref="select_mod">
      <div className="Select-control" onClick={this.toggle}>
        <div className="Select-value">
          {selectedItem ? <span>{selectedItem[keyName]}</span> : <span>请选择</span>}
        </div>
        <span className={classNames('glyphicon', {'glyphicon-triangle-bottom': !showChild, 'glyphicon-triangle-top': showChild})} />
      </div>
      { showChild ? <div className={classNames('Select-children', {'unfold-up': unfoldUp})}>
        {data && data.map(item =>
          <div
            className={classNames('option-item', {active: selectedItem && selectedItem.id == item.id})}
            onClick={event => this.onSelect(item, event)} key={item.id}>
            {item[keyName]}
          </div>
        )}
      </div> : null}
    </div>);
  }
});

module.exports = SelectBase;
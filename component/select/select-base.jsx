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
    onToggleShow: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      keyName: 'name'
    };
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
    var { onToggleShow } = this.props;
    var result;
    this.showUpOrDown();
    if (Object.prototype.toString.call(action) == '[object Boolean]') {
      result = action;
      this.setState({
        showChild: action
      });
    } else {
      result = !this.state.showChild;
      this.setState({
        showChild: result
      });
    }
    if (onToggleShow) onToggleShow(result);
  },
  showUpOrDown() {
    var selectDOM = this.refs.select_mod;
    if (selectDOM.getBoundingClientRect().top <= window.innerHeight/2 + window.scrollY) {
      this.setState({
        unfoldUp: false
      });
    } else {
      this.setState({
        unfoldUp: <true></true>
      });
    }
  },
  onSelect(item) {
    this.setState({
      selectedItem: item,
    }, () => this.toggle(false));
    var { onSelect } = this.props;
    if (onSelect) onSelect(item);
  },
  render() {
    var { keyName, defaultSelect, ...others } = this.props;
    var { showChild, data, selectedItem, unfoldUp } = this.state;
    return (<div className="Select-base" ref="select_mod" {...others}>
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
var React = require('react');
var _ = require('underscore');
var NavTab = require('../NavTab');
var BaseInfo = require('./base-info');
var PersonInfo = require('./person-info');
var PriceInfo = require('./price-info');
var Registry = {};
Registry[NavTab.BASE] = BaseInfo;
Registry[NavTab.PERSON] = PersonInfo;
Registry[NavTab.PRICE] = PriceInfo;

var Template1Main = React.createClass({
  propTypes: {
    infoType: React.PropTypes.string,
    data: React.PropTypes.object,
    onChange: React.PropTypes.func,
    proposersArray: React.PropTypes.array,
  },
  getInitialState() {
    return {
      activeNav: NavTab.BASE
    }
  },
  onTabChange(tab) {
    this.setState({
      activeNav: tab
    });
  },
  onDataChange(newData, type) {
    var { onChange, data } = this.props;
    var activeData = data[type];
    _.extend(activeData, newData);
    onChange(data);
  },
  render() {
    var { proposersArray, data } = this.props;
    var { activeNav } = this.state;
    var Component = Registry[activeNav];
    var activeData = data[activeNav];
    return (<div>
      <NavTab onTabChange={this.onTabChange} activeNav={activeNav}/>
      <div className="content-for-info">
        <Component
          onChange={newData => {this.onDataChange(newData, activeNav)}} {...activeData}
          proposersArrayMeta={proposersArray}
        />
      </div>
    </div>);
  }
});

module.exports = Template1Main;
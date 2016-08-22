var React = require('react');
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
  render() {
    var { activeNav } = this.state;
    var Component = Registry[activeNav]
    return (<div>
      <NavTab onTabChange={this.onTabChange} activeNav={activeNav}/>
      <div className="content-for-info">
        <Component />
      </div>
    </div>);
  }
});

module.exports = Template1Main;
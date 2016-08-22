var React = require('react');
var NavTab = require('../NavTab');
var Registry = {};
Registry[NavTab.BASE] = React.createClass({
  render() {
    return (<div>base form Template2</div>);
  }
});
Registry[NavTab.PERSON] = React.createClass({
  render() {
    return (<div>PERSON form Template2</div>);
  }
});
Registry[NavTab.PRICE] = React.createClass({
  render() {
    return (<div>PRICE form Template2</div>);
  }
});

var Template2Main = React.createClass({
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

module.exports = Template2Main;
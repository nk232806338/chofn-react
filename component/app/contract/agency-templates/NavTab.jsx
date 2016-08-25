var React = require('react');
var classNames = require('classnames');
var TAB_TYPE = {
  BASE: 'BASE',
  PRICE: 'PRICE',
  PERSON: 'PERSON',
};
var NavTabs = React.createClass({
  statics: TAB_TYPE,
  propTypes: {
    activeNav: React.PropTypes.string,
    onTabChange: React.PropTypes.func,
  },
  render() {
    var { onTabChange, activeNav } = this.props;
    return (<div className="Nav-tabs" style={{marginBottom: '20px'}}>
      <ul className="nav nav-tabs nav-justified">
        <li
          role="presentation" className={classNames({active : activeNav == TAB_TYPE.BASE})}
          onClick={event => {onTabChange(TAB_TYPE.BASE, event)}}
        >
          <a>基本信息</a>
        </li>
        <li role="presentation"  className={classNames({active : activeNav == TAB_TYPE.PRICE})}
            onClick={event => {onTabChange(TAB_TYPE.PRICE, event)}}><a>费用信息</a></li>
        <li role="presentation"  className={classNames({active : activeNav == TAB_TYPE.PERSON})}
            onClick={event => {onTabChange(TAB_TYPE.PERSON, event)}}><a>申请人信息</a></li>
      </ul>
    </div>);
  }
});

module.exports = NavTabs;
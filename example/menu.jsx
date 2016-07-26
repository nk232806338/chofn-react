var React = require('react');
var classNames = require('classnames');
require('./menu.less');

var Menu = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
  },
  render() {
    var { data, onChange } = this.props;
    return (<div className="Framework-sidebar">
      <div className="sidebar-content">
        {data.map(menu => <div className="sidebar-nav" key={menu.id}>
          <div className="sidebar-title">
            <span className="glyphicon glyphicon-triangle-right" /><span>{menu.name}</span>
          </div>
          <ul>
            {menu.children.map(child =>
              <li
                key={child.id} onClick={event => onChange(child, event)}
                className={classNames({'active': child.active})}>
                {child.name}
              </li>
            )}
          </ul>
        </div>)}
      </div>
    </div>);
  }
});

module.exports = Menu;
var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');
require('./nav-tab.less');
var NavTab = React.createClass({
  propTypes: {
    addTab: React.PropTypes.func,
    removeTab: React.PropTypes.func,
    activeTab: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      data: []
    }
  },
  addTab(event) {
    event.stopPropagation();
    var { addTab } = this.props;
    if (addTab) {
      addTab();
    }
  },
  removeTab(tabId, event) {
    event.stopPropagation();
    var { removeTab } = this.props;
    if (removeTab) {
      removeTab(tabId);
    }
  },
  activeTab(tabId) {
    var { activeTab } = this.props;
    if (activeTab) {
      activeTab(tabId);
    }
  },
  render() {
    var { data } = this.props;
    return (<div className="cf-nav-tab">
      <ul className="nav nav-tabs nav-justified">
        {data.map((item, index) =>
          <li
            onClick={event => this.activeTab(item.id, event)} style={{cursor: 'pointer'}}
            className={classNames({'active': item.active})} key={_.uniqueId('li-')}
          >
            <a>
              {index + 1}.{item.name}
              {!item.active ?
                <span className="glyphicon glyphicon-remove remove-icon"
                      onClick={event => {this.removeTab(item.id, event)}}
                /> : null
              }
            </a>
          </li>
        )}
        <li className="add-btn-wrapper">
          <a onClick={this.addTab}><span className="glyphicon glyphicon-plus add"></span></a>
        </li>
      </ul>
    </div>);
  }
});

module.exports = NavTab;
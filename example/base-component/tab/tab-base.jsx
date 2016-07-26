var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');
var A = React.createClass({
  render() {
    return (<div>
      <div style={{height: '200px'}}>
        内容AAAA <br/>
        内容AAAA <br/>
        内容AAAA <br/>
        内容AAAA <br/>
      </div>
    </div>);
  }
});

var B = React.createClass({
  render() {
    return (<div>
      <div style={{height: '200px'}}>
        内容BBBB <br/>
        内容BBBB <br/>
        内容BBBB <br/>
        内容BBBB <br/>
      </div>
    </div>);
  }
});

var C = React.createClass({
  render() {
    return (<div>
      <div style={{height: '200px'}}>
        内容CCC <br/>
        内容CCC <br/>
        内容CCC <br/>
        内容CCC <br/>
      </div>
    </div>);
  }
});

var Data = [
  {name: '选项卡A', component: A, active: true},
  {name: '选项卡B', component: B, active: false},
  {name: '选项卡C', component: C, active: false},
];

var TabBase = React.createClass({
  getInitialState() {
    return {
      data: Data
    }
  },
  onChangeNav(item) {
    var { data } = this.state;
    _.each(data, item => item.active = false);
    _.find(data, {name: item.name}).active = true;
    this.setState({
      data
    });
  },
  render() {
    var { data } = this.state;
    var Component = _.find(data, {active: true}).component;
    return (<div>
      <div className="panel panel-default">
        <div className="panel-heading">基础标签切换</div>
        <div className="panel-body">
          <ul className="nav nav-tabs">
            {data.map(item =>
              <li
                onClick={event => this.onChangeNav(item, event)} style={{cursor: 'pointer'}}
                className={classNames({'active': item.active})} key={_.uniqueId('li-')}
              >
                <a>{item.name}</a>
              </li>
            )}
          </ul>
          <div className="content-for-nav" style={{padding: '20px'}}>
            <Component />
          </div>
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">两端对齐的标签切换</div>
        <div className="panel-body">
          <ul className="nav nav-tabs nav-justified">
            {data.map(item =>
              <li
                onClick={event => this.onChangeNav(item, event)} style={{cursor: 'pointer'}}
                className={classNames({'active': item.active})} key={_.uniqueId('li-')}
              >
                <a>{item.name}</a>
              </li>
            )}
          </ul>
          <div className="content-for-nav" style={{padding: '20px'}}>
            <Component />
          </div>
        </div>
      </div>

    </div>);
  }
});

module.exports = TabBase;
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Menu = require('./menu');
var TabMain = require('./base-component/tab/tab-main');
var TableExample = require('./base-component/table/table-example');
var SelectExample = require('./base-component/select/select-example');
var ButtonExample = require('./base-component/button/button-example');
require('./main.less');
var Registry = {
  'tab': TabMain,
  'table': TableExample,
  'select': SelectExample,
  'button': ButtonExample
};

var MenuData = [{
  id: 1,
  name: '表单组件',
  children: [
    {name: 'tab选项卡', id: 1.1, key: 'tab', active: true},
    {name: 'table表格', id: 1.2, key: 'table'},
    {name: 'select下拉框', id: 1.3, key: 'select'},
    {name: '基础Input', id: 1.4},
    {name: 'button按钮组件', id: 1.5, key: 'button'},
  ]
},{
  name: '表单2',
  id: 2,
  children: [
    {name: '表格', id: 2.1},
    {name: '基础Input', id: 2.2},
  ]
}];
var ExampleApp = React.createClass({
  getInitialState() {
    return {
      CurrentComponent: ButtonExample,
      menuData: MenuData
    }
  },
  onMenuChange(willActiveMenu) {
    var { menuData } = this.state;
    _.each(menuData, menu => {
      _.each(menu.children, child => {
        child.active = false;
        if (child.id == willActiveMenu.id) {
          child.active = true;
        }
      })
    });
    this.setState({
      CurrentComponent: Registry[willActiveMenu.key],
      menuData
    });
  },
  render() {
    var { CurrentComponent, menuData } = this.state;
    return (<div>
      <Menu data={menuData} onChange={this.onMenuChange}/>
      <div className="Workspace-container">
        <CurrentComponent />
      </div>
    </div>);
  }
});

ReactDOM.render(<ExampleApp/>, document.getElementById('react-container'));


var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Menu = require('./menu');
var TabMain = require('./base-component/tab/tab-main');
var TableExample = require('./base-component/table/table-example');
var SelectExample = require('./base-component/select/select-example');
var ButtonExample = require('./base-component/button/button-example');
var FormExample = require('./base-component/form/form-example');
var PaginationExample = require('./base-component/pagination/pagination-example');
require('./main.less');
var Registry = {
  'tab': TabMain,
  'table': TableExample,
  'select': SelectExample,
  'button': ButtonExample,
  'form': FormExample,
  'pagination': PaginationExample
};

var MenuData = [{
  id: 1,
  name: '基础表单组件',
  children: [
    {name: 'tab选项卡', id: 1.1, key: 'tab', active: true},
    {name: 'table表格', id: 1.2, key: 'table'},
    {name: 'select下拉框', id: 1.3, key: 'select'},
    {name: 'form表单验证', id: 1.4, key: 'form'},
    {name: 'button按钮组件', id: 1.5, key: 'button'},
    {name: 'pagination分页组件', id: 1.6, key: 'pagination'},
  ]
},{
  name: '功能组件',
  id: 2,
  children: [
    {name: '日历', id: 2.1},
  ]
}];
var ExampleApp = React.createClass({
  getInitialState() {
    return {
      CurrentComponent: TabMain,
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
        { CurrentComponent ? <CurrentComponent /> : null}
      </div>
    </div>);
  }
});

ReactDOM.render(<ExampleApp/>, document.getElementById('react-container'));


var React = require('react');
var TableBase = require('../../../component/table/table-base');
var data = require('./data.json');
var TableExample = React.createClass({
  render() {
    return (<div>

      <div className="panel panel-default">
        <div className="panel-heading">基础表格</div>
        <div className="panel-body">
          <TableBase hasIndex data={data} onSelect={this.onSelect}>
            <TableBase.Column header={{cell: '', name: '客户名义'}} td={{cell: '', key: 'name'}} onEvents={this.onTableEvents} />
            <TableBase.Column header={{cell: '', name: '客户英文名称'}} td={{cell: '', key: 'name_en'}} onEvents={this.onTableEvents} />
            <TableBase.Column header={{cell: '', name: '客户地址'}} td={{cell: '', key: 'address'}} onEvents={this.onTableEvents} />
            <TableBase.Column header={{cell: '', name: '客户地址（英文）'}} td={{cell: '', key: 'address_en'}} onEvents={this.onTableEvents} />
            <TableBase.Column header={{cell: '', name: '所属顾问'}} td={{cell: '', key: 'consultantName'}} onEvents={this.onTableEvents} />
          </TableBase>
        </div>
      </div>

    </div>);
  }
});

module.exports = TableExample;
var React = require('react');
var Formsy = require('formsy-react');
var InputBase = require('../../form/input-base');
var SelectBase = require('../../select/select-base.jsx');
var TableBase = require('../../table/table-base');
var Pagination = require('../../pagination/pagination-base');
require('../../form/form.less');
var ContractAgent = React.createClass({
  render() {
    return (<div>
      <Formsy.Form onSubmit={this.submit} ref="form">
        <div className="panel panel-default">
          <div className="row">
            <div className="col-sm-3">
              <div className="Form-item clearfix small">
                <label>合同编号</label>
                <InputBase name="pwd" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="Form-item clearfix small">
                <label>委托人</label>
                <InputBase name="pwd" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="Form-item clearfix small">
                <label>合同状态</label>
                <SelectBase />
              </div>
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn btn-primary" style={{marginTop: '4px'}}>
                <span className="glyphicon glyphicon-search" aria-hidden="true" style={{marginRight: '4px'}}/>查询
              </button>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs">
          <li role="presentation" className="active"><a href="#">待处理</a></li>
          <li role="presentation"><a href="#">草稿</a></li>
          <li role="presentation"><a href="#">已处理</a></li>
        </ul>

        <div className="panel panel-default">
          <div className="panel-heading"><strong>委托人信息</strong></div>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-6">
                <div className="Form-item clearfix">
                  <label>数字</label>
                  <InputBase name="pwd" validations="isNumeric" validationError="您填写的数字格式有误" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="Form-item clearfix">
                  <label>委托人名称</label>
                  <SelectBase />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="Form-item clearfix">
                  <label>数字</label>
                  <InputBase name="pwd" validations="isNumeric" validationError="您填写的数字格式有误" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formsy.Form>

      <TableBase hasIndex>
        <TableBase.Column header={{cell: '', name: 'id'}} td={{cell: '', key: 'id'}} onEvents={this.onTableEvents} />
        <TableBase.Column header={{cell: '', name: 'name'}} td={{cell: '', key: 'name'}} onEvents={this.onTableEvents} />
      </TableBase>

      <Pagination />
    </div>);
  },
  onTableEvents() {
  }
});

module.exports = ContractAgent;
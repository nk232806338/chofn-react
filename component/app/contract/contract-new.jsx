var React = require('react');
var Formsy = require('formsy-react');
var InputBase = require('../../form/input-base');
var SelectBase = require('../../select/select-base.jsx');
var TableBase = require('../../table/table-base');
var Pagination = require('../../pagination/pagination-base');
var Dialog = require('../../dialog/dialog-base');
var Customers = require('./customers');
var CustomersData = require('./customers.json');
var proposersData = require('./data/proposer.json');
var PriceCalculater = require('./price-calculate/price-calculater-main');
require('../../form/form.less');
var ContractNew = React.createClass({
  getInitialState() {
    return {
      customerDialog: false,
      customerData: null,
      proposerData: null
    }
  },
  showCustomerDialog() {
    this.setState({
      customerDialog: true,
    });
  },
  closeCustomerDialog() {
    this.setState({
      customerDialog: false,
    });
  },
  onSelectCustomer(customer) {
    console.info(customer);
    this.setState({
      customerDialog: false,
      customerData: customer,
      proposerData: proposersData.body.data[0]
    });
  },
  onSelectProposer(proposer) {
    console.info(proposer);
    this.setState({proposerData: proposer});
  },
  render() {
    var { customerDialog, customerData, proposerData } = this.state;
    return (<div>
      <Formsy.Form onSubmit={this.submit} ref="form">
        <div className="panel panel-default">
          <div className="panel-heading"><strong>委托人信息</strong></div>
          <div className="panel-body">
            <button type="button" className="btn btn-primary" onClick={this.showCustomerDialog} style={{marginBottom: '15px'}}>
              <span className="glyphicon glyphicon-search" aria-hidden="true" style={{marginRight: '4px'}}/>选择客户
            </button>
            { customerDialog ? <Dialog align="top" width="900" onClose={this.closeCustomerDialog} title="选择客户">
              <Customers data={CustomersData.body.data.rows} onSelect={this.onSelectCustomer} />
            </Dialog> : null}
            { customerData ? <div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>客户</label>
                    <InputBase name="pwd" required value={customerData.name}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>委托人名称</label>
                    <SelectBase data={proposersData.body.data} keyName="proposerName" onSelect={this.onSelectProposer}/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>委托人地址</label>
                    <InputBase name="address" required value={proposerData.proposerWholeAddress} tips="请输入委托人地址"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>联系人姓名</label>
                    <InputBase name="pwd" required tips="请输入联系人姓名"/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>手机</label>
                    <InputBase name="pwd" required tips="请输入联系人手机"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>联系人邮箱</label>
                    <InputBase name="pwd" required tips="请输入联系人邮箱"/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>联系人座机</label>
                    <InputBase name="pwd" required tips="请输入联系人座机"/>
                  </div>
                </div>
              </div>
            </div> : null}
          </div>
        </div>
        { customerData ? <PriceCalculater /> : null}
      </Formsy.Form>


    </div>);
  }
});

module.exports = ContractNew;
var React = require('react');
var Formsy = require('formsy-react');
var _ = require('underscore');
var FormItemBase = require('../../form/Form-item-base');
var SelectForm = require('../../select/form-item-select');
var TableBase = require('../../table/table-base');
var Pagination = require('../../pagination/pagination-base');
var Dialog = require('../../dialog/dialog-base');
var Customers = require('./customers');
var ContractContainer = require('./agency-templates/contract-container');
var Alert = require('../../alert/alert');
var API = require('../../api');
var axios = require('axios');
var Model = require('./contract-new-model');
require('../../form/form.less');
require('./contract-new.less');

// ----- Test Code Begin
// ----- Test Code End

var AlertModel = function (show, type, msg) {
  this.show = show || false;
  this.type = type || '';
  this.msg = msg || '';
};

var ContractNew = React.createClass({
  propsTypes: {
    // 要查询的代理服务的id, 若存在为修改, 不存在为新建
    contractDetailId: React.PropTypes.any
  },
  getInitialState() {
    return {
      customerDialog: false,
      customer: null,
      proposer: {}, // 当前选中申请人
      bailor: {}, // 当前选中委托人
      contact: {}, // 当前选中联系人
      bailorsArray: [],
      proposersArray: [],
      contactsArray: [],
      alertModel: new AlertModel(),
      // 是否根据选中customer发起请求,完成额外信息的加载,
      // 额外信息包括 proposers, bailors 和 contacts
      // 加载完成后方可展示所有的合同列表
      isFetchedModel: false,
      contractDetail: {}, // 当前合同的详细信息
      contractsArray: [] // 某合同下的所有代理服务数组
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
      loading: true,
      customer,
      alertModel: new AlertModel(true, Alert.LOADING),
      customerDialog: false,
    });
    Model(customer.id, this.props.contractDetailId).then(result => {
      var bailor = result.bailorsArray[0],
        contact = _.find(result.contactsArray, {contactId: bailor && bailor.contactId});
      if (result.proposersArray.length == 0 || result.bailorsArray == 0 || result.contactsArray == 0) {
        this.setState({
          alertModel: new AlertModel(true, Alert.DANGER, '数据拉取错误'),
        });
      } else {
        this.setState({
          proposersArray: result.proposersArray,
          bailorsArray: result.bailorsArray,
          bailor,
          contactsArray: result.contactsArray,
          contact,
          alertModel: new AlertModel(false),
          isFetchedModel: true,
          contractDetail: result.contractDetail,
          contractArray: this.transContractArray(result.contractDetail),
        });
      }
    }).catch(error => {
      console.info('新建合同初始化数据错误');
      console.info(error.stack);
    });
  },
  transContractArray(contractDetail) {
    if (!contractDetail) {
      return [{templateType: '1', id: 1212, data: {}, showExpand: false}];
    }
    return contractDetail.itemFinance.items.map(item => {
      return {templateType: item.commitmentId, id: item.detailId, data: {}, showExpand: false};
    });
  },
  onSelectBailor(bailor) {
    var { contactsArray } = this.state;
    this.setState({
      bailor: bailor,
      contact: _.find(contactsArray, {contactId: bailor.contactId})
    });
  },
  onContractArrayChange(newContractArray) {
    this.setState({
      contractArray: newContractArray
    });
    console.info(newContractArray);
  },
  componentDidMount() {
    this.onSelectCustomer({
      id: 1989553
    });
  },
  render() {
    var { customerDialog, customer, proposersArray,
      bailorsArray, bailor, contact, alertModel, isFetchedModel, contractArray } = this.state;
    return (<div>
      {alertModel.show ? <Alert type={alertModel.type}>{alertModel.msg}</Alert> : null}
      <div className="panel panel-default">
        <div className="panel-heading"><strong>委托人信息</strong></div>
        <div className="panel-body">
          <button type="button" className="btn btn-primary" onClick={this.showCustomerDialog}
                  style={{marginBottom: '15px'}}>
            <span className="glyphicon glyphicon-search" aria-hidden="true" style={{marginRight: '4px'}}/>选择客户
          </button>
          { customerDialog ? <Dialog align="top" width="900" onClose={this.closeCustomerDialog} title="选择客户">
            <Customers data onSelect={this.onSelectCustomer}/>
          </Dialog> : null}
          { customer && isFetchedModel ? <div>
            <Formsy.Form onSubmit={this.submit} ref="form" className="proposer-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>客户</label>
                    <FormItemBase name="pwd" required value={customer.name || ''} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>委托人名称</label>
                    <FormItemBase name="wdName" tips="请选择委托人">
                      <SelectForm
                        options={bailorsArray} labelKey="bailorName"
                        value={bailor.bailorId} valueKey="bailorId"
                        onChange={this.onSelectBailor} clearable={false}
                      />
                    </FormItemBase>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>委托人地址</label>
                    <FormItemBase name="address" required value={bailor.bailorWholeAddress || ''} tips="请输入委托人地址"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>联系人姓名</label>
                    <FormItemBase name="pwd" required tips="请输入联系人姓名" value={contact.contactName || ''} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>手机</label>
                    <FormItemBase name="pwd" required tips="请输入联系人手机" value={contact.contactMobile || ''} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>联系人邮箱</label>
                    <FormItemBase name="pwd" required tips="请输入联系人邮箱" value={contact.contactEmail || ''} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="Form-item clearfix">
                    <label>联系人座机</label>
                    <FormItemBase name="pwd" required tips="请输入联系人座机" value={contact.contactTel || ''} />
                  </div>
                </div>
              </div>
            </Formsy.Form>
          </div> : null}
        </div>
      </div>
      { customer && isFetchedModel ?
        <ContractContainer
          {...this.props} proposersArray={proposersArray}
          data={contractArray} onChange={this.onContractArrayChange}
        /> : null
      }
      <div style={{marginBottom: '60px'}}></div>
    </div>);
  }
});

module.exports = ContractNew;
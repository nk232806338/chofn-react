var React = require('react');
var _ = require('underscore');
var Select = require('react-select');
var axios = require('axios');
var API = require('../../../api');
var templateTypeData = require('../data/meta-data-5-template-type.json').body.data.COMMITMENT;
var TemplatesRegistry = require('./TemplatesRegistry');
var NavTab = require('./NavTab');
require('./contract-container.less');
/**
 * @desc [代理服务合同创建模块]
 * 代理服务有多种类型,(如 国内专利发明申请、专利转让等)
 * 每种代理服务类型都有对应的业务模板, 此业务组件包含用户创建的多种代理服务
 */
var ContractContainer = React.createClass({
  propTypes: {
    proposersArray: React.PropTypes.array,
    data: React.PropTypes.any, // 代理服务数组,
    onChange: React.PropTypes.func,
  },
  componentDidMount() {
    var contractArray = this.props.data;
    this.toggleExpand(contractArray[0]);
  },
  addContract(a, event) {
    event.stopPropagation();
    this.state.contractArray.push({id: _.uniqueId('template-id-')});
    this.setState({
      contractArray: this.state.contractArray
    });
  },
  removeContract(contract, event) {
    event.stopPropagation();
    var { contractArray } = this.state;
    this.setState({
      contractArray : _.without(contractArray, _.findWhere(contractArray, {
        id: contract.id
      }))
    });
  },
  onChangeTemplate(templateType, contract) {
    // the param : contract is a reference of
    var contractArray = this.props.data;
    _.find(contractArray, {id: contract.id}).templateType = templateType.id;
    this.props.onChange(contractArray);
  },
  transData(data) {
    var result = {};
    var clarificaitonbook = data.clarificaitonbook || {};
    result[NavTab.BASE] = {
      hasProject: clarificaitonbook.hasProject,
      hasPicture: clarificaitonbook.hasPicture,
      hasClarificaitonbook: clarificaitonbook.hasClarificaitonbook,
      clarificaitonBookName: clarificaitonbook.name,
      clarificaitonRemark: clarificaitonbook.remark,
      bookFile: clarificaitonbook.bookFile,
      files: clarificaitonbook.files,
      priority: data.priority,
      submitCheck: data.contractDetailExt.submitCheck,
      advancedPublic: data.contractDetailExt.advancedPublic,
      timeLimit: data.contractDetailExt.timeLimit,
      isRisk: data.contractDetail.isRisk,
      cutFee: data.contractDetailExt.cutFee,
      rightItemNum: data.contractDetailExt.rightItemNum,
      specificationPageNum: data.contractDetailExt.specificationPageNum,
      contractDetailRemark: data.contractDetail.remark,
      isPriority: data.contractDetail.isPriority,
    };
    result[NavTab.PRICE] = {

    };
    result[NavTab.PERSON]= {
      contractDetailProposer: data.contractDetailProposer,
    };
    return result;
  },
  toggleExpand(contract) {
    if (!contract.templateType) return false;
    var contractArray = this.props.data;
    // _.each(contractArray, contract => contract.showExpand = false);
    var currentContract = _.find(contractArray, {id: contract.id});
    currentContract.showExpand = !currentContract.showExpand;
    if (_.isEmpty(currentContract.data)) {
      axios.post(API.test, '', {
        headers: {'Content-Type': ' '}
      })
        .then(response => {
          // we need to rebuilt the structure of response data in order to adjust the Front-End's need
          currentContract.data = this.transData(response.data.body.data);
          this.props.onChange(contractArray);
          console.info(currentContract.data);
        })
        .catch(function (error) {
          console.info(error.stack);
          console.log(error);
        });
    } else {
      /**
       * @author niekai
       * @date 2016/09/05
       * This is a little trick!
       * Sometimes a component is rendered by it's props
       * because the definition of Props, your should execute a callback function
       * to notify the Parent the props is changed, it's no need to do this when you just
       * want render your component when change some props but your want't keep it.
       * Certainly the change will not keep in memory when your component is render by your parent again;
       * In this case used for currentContract.showExpand
       */
      this.forceUpdate();
    }
  },
  saveAsDraft() {
  },
  onContractDataChange(data, contractId) {
    var contractArray = this.props.data;
    _.find(contractArray, {id: contractId}).data = data;
    this.props.onChange(contractArray);
  },
  render() {
    var { proposersArray, data } = this.props;
    var contractArray = data;
    return (<div className="Contract-container-mod">
      {contractArray.map(contract => {
        var contractTemplate =  _.find(TemplatesRegistry, {id: contract.templateType});
        var TemplateComponent = contractTemplate ? contractTemplate.component : 'div';
        return (
          <div className="panel panel-default" key={contract.id}>
            <div className="panel-heading" onClick={event => {this.toggleExpand(contract, event)}}>
              <h3 className="panel-title">
                <div className="row">
                  <div className="col-sm-3" onClick={event => event.stopPropagation()}>
                    <Select options={_.map(templateTypeData, (value, key) => {
                        return {'id':key, 'value': key, label: value} }
                      )}
                    value={contract.templateType} clearable={false}
                    onChange={newTemplate => {
                      this.onChangeTemplate(newTemplate, contract)
                    }}
                    />
                  </div>
                  <div className="col-sm-3">
                  </div>
                  <div className="col-sm-3">
                    <div style={{marginTop: '4px'}}/>
                    <button
                      type="button" className="btn btn-default" style={{marginRight: '6px'}}
                      onClick={event => this.addContract(contract, event)}
                    >
                      <span className="glyphicon glyphicon-plus" aria-hidden="true" style={{marginRight: '4px'}}/>添加
                    </button>
                    <button type="button" className="btn btn-default" style={{marginRight: '6px'}}>
                      <span className="glyphicon glyphicon-duplicate" aria-hidden="true" style={{marginRight: '4px'}}/>复制
                    </button>
                    <button type="button" className="btn btn-default" onClick={event => {this.removeTemplate(templateInstance, event)}}>
                      <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{marginRight: '4px'}}/>删除
                    </button>
                  </div>
                  { contract.templateType ? <div className="col-sm-3 toggle-switch-wrapper">
                    <i className="toggle-switcher">
                      { !contract.showExpand ? <span className="glyphicon glyphicon-menu-down"><a></a></span> : <span className="glyphicon glyphicon-menu-up"><a></a></span>}
                    </i>
                  </div> : null}
                </div>
              </h3>
            </div>
            {contract.showExpand && contract.templateType ? <div className="panel-body">
              <TemplateComponent
                data={contract.data} onChange={data => this.onContractDataChange(data, contract.id)}
                proposersArray={proposersArray}
              />
            </div> : null}
            <div style={{marginBottom: '40px'}} />
            <div className="panel-footer">
              <button type="button" className="btn btn-primary" onClick={this.saveAsDraft}>
                <span className="glyphicon glyphicon-file" aria-hidden="true" style={{marginRight: '4px'}}/>保存草稿
              </button>
            </div>
          </div>
        )}
      )}
    </div>);
  }
});

module.exports = ContractContainer;
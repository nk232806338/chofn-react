var React = require('react');
var _ = require('underscore');
var Select = require('react-select');
var templateTypeData = require('../data/meta-data-5-template-type.json').body.data.COMMITMENT;
var TemplatesRegistry = require('./TemplatesRegistry');
require('./price-calculater.less');
/**
 * @desc [代理服务合同创建模块]
 * 代理服务有多种类型,(如 国内专利发明申请、专利转让等)
 * 每种代理服务类型都有对应的业务模板, 此业务组件包含用户创建的多种代理服务
 */
var ContractContainer = React.createClass({
  getInitialState() {
    return {
      // 代理服务合同数组
      contractArray: [{templateType: '1', id: 1212, data: {}, showExpand: true}]
    };
  },
  componentDidMount() {

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
    var { contractArray } = this.state;
    contract.templateType = templateType.id;
    this.toggleExpand(contract);
    this.setState({
      contractArray
    });
  },
  toggleExpand(contract) {
    if (!contract.templateType) return false;
    var { contractArray } = this.state;
    _.each(contractArray, contract => contract.showExpand = false);
    var currentContract = _.find(contractArray, {id: contract.id});
    currentContract.showExpand = !currentContract.showExpand;
    this.setState(contractArray);
  },
  render() {
    var { contractArray } = this.state;
    return (<div className="Price-calculater">
      {contractArray.map(contract => {
        var contractTemplate =  _.find(TemplatesRegistry, {id: contract.templateType});
        var TemplateComponent = contractTemplate ? contractTemplate.component : 'div';
        return (
          <div className="panel panel-default" key={contract.id}>
            <div className="panel-heading" onClick={event => {this.toggleExpand(contract, event)}}>
              <h3 className="panel-title">
                <div className="row">
                  <div className="col-sm-3">
                    <Select options={_.map(templateTypeData, (value, key) => {
                        return {'id':key, 'value': key, label: value} }
                      )}
                    value={contract.templateType} clearable={false}
                    onChange={newTemplate => {
                      this.onChangeTemplate(newTemplate, contract)
                    }}
                    onClick={event => event.stopPropagation()}
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
              <TemplateComponent data={contract.data} />
            </div> : null}
          </div>
        )}
      )}
    </div>);
  }
});

module.exports = ContractContainer;
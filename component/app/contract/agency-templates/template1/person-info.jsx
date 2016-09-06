var React = require('react');
var Formsy = require('formsy-react');
var _ = require('underscore');
var Proposer = require('../common/proposer');
var FormsyItem = require('../../../../form/Form-item-base');
var NavTab = require('../../../../nav-tab/nav-tab');
require('react-select/dist/react-select.css');
var Inventor = require('../common/inventors');

var PersonInfo = React.createClass({
  propTypes: {
    proposersArrayMeta: React.PropTypes.array,
    contractDetailProposer: React.PropTypes.any, // 申请人数组
  },
  getInitialState() {
    var { contractDetailProposer } = this.props;
    var contractDetailProposer = contractDetailProposer || [];
    var transData = this.transData(contractDetailProposer);
    return {
      file: {name: '测试数据', url: '/uploads/logo.png'},
      proposerArray: transData,
      activeProposer: transData[0]
    };
  },
  transData(contractDetailProposer) {
    var transData = contractDetailProposer.map(proposer => {
      return {name: '申请人', id: _.uniqueId('proposer-id-'), data: proposer, component: <Proposer />};
    });
    return transData.length > 0 ? transData : [{name: '申请人', id: _.uniqueId('proposer-id-'), data: {}, component: <Proposer />}];
  },
  unTransData(transData) {
    return transData.map(proposer => {
      return proposer.data;
    })
  },
  addTab() {
    var { proposersArrayMeta } = this.props;
    this.setState({
      proposerArray: this.state.proposerArray.concat({
        name: '申请人', id: _.uniqueId('priority-id-'), data: proposersArrayMeta[0], component: <Proposer />})
    });
  },
  removeTab(tabId) {
    this.setState({
      proposerArray: _.filter(this.state.proposerArray, item => {return item.id != tabId;})
    });
  },
  activeTab(tabId) {
    var { proposerArray } = this.state;
    this.setState({
      activeProposer: _.find(proposerArray, {id: tabId})
    });
  },
  onChange(values, proposerId) {
    var { proposerArray } = this.state;
    var { data, onChange } = this.props;
    var proposer = _.find(proposerArray, {id: proposerId});
    proposer.data = _.extend(proposer.data, values);
    onChange(this.unTransData(proposerArray));
  },
  render() {
    var { proposerArray, activeProposer } = this.state;
    var { proposersArrayMeta } = this.props;
    var Proposer = activeProposer.component;
    return (<div>
      <NavTab
        data={proposerArray} addTab={this.addTab}
        removeTab={this.removeTab} activeTab={this.activeTab}
        active={activeProposer.id}
      />
      <div className="nav-content">

        {React.cloneElement(Proposer, {
          data: activeProposer.data,
          proposersArrayMeta: proposersArrayMeta,
          onChange: values => this.onChange(values, activeProposer.id)
        })}
      </div>
      <Inventor />
    </div>);
  }
});

module.exports = PersonInfo;
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
  },
  getInitialState() {
    var { data } = this.props;
    var contractDetailProposer = data.contractDetailProposer || [];
    var transData = this.transData(contractDetailProposer);
    return {
      file: {name: '测试数据', url: '/uploads/logo.png'},
      proposerArray: transData,
      activeProposer: transData[0]
    };
  },
  transData(contractDetailProposer) {
    return contractDetailProposer.map(proposer => {
      return {name: '申请人', id: _.uniqueId('proposer-id-'), data: proposer, component: <Proposer />};
    }) || [{name: '申请人', id: _.uniqueId('proposer-id-'), data: {}, component: <Proposer />}];
  },
  unTransData() {

  },
  addTab() {
    this.setState({
      proposerArray: this.state.proposerArray.concat({name: '申请人', id: _.uniqueId('priority-id-')})
    });
  },
  removeTab(tabId) {
    this.setState({
      proposerArray: _.filter(this.state.proposerArray, item => {return item.id != tabId;})
    });
  },
  activeTab(tabId) {
    var { proposerArray } = this.state;
    _.find(proposerArray, {active: true}).active = false;
    _.find(proposerArray, {id: tabId}).active = true;
    this.setState({
      proposerArray
    });
  },
  onChange(values, proposerId) {

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
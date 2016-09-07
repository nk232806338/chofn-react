var React = require('react');
var Formsy = require('formsy-react');
var _ = require('underscore');
var Proposer = require('../common/proposer');
var FormsyItem = require('../../../../form/Form-item-base');
var NavTab = require('../../../../nav-tab/nav-tab');
require('react-select/dist/react-select.css');
var Inventor = require('../common/inventors');

var DefaultHolder = React.createClass({
  render() {
    return (<div style={{height: '330px'}}></div>);
  }
});

var PersonInfo = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    proposersArrayMeta: React.PropTypes.array,
    contractDetailProposer: React.PropTypes.any, // 申请人数组
  },
  getInitialState() {
    var { contractDetailProposer } = this.props;
    this.transData = this.transData(contractDetailProposer || []);
    return {
      file: {name: '测试数据', url: '/uploads/logo.png'},
      activeProposer: this.transData[0]
    };
  },
  transData(contractDetailProposer) {
    var transData = contractDetailProposer.map(proposer => {
      return {name: '申请人', id: _.uniqueId('proposer-id-'), data: proposer, component: Proposer};
    });
    return transData.length > 0 ? transData : [{name: '申请人', id: _.uniqueId('proposer-id-'), data: {}, component: Proposer}];
  },
  unTransData(transData) {
    return transData.map(proposer => {
      return proposer.data;
    })
  },
  addTab() {
    var { proposersArrayMeta } = this.props;
    this.transData = this.transData.concat({
      name: '申请人', id: _.uniqueId('priority-id-'), data: _.assign({}, proposersArrayMeta[0]), component: Proposer});
    this.props.onChange({
      contractDetailProposer: this.unTransData(this.transData)
    });
  },
  removeTab(tabId) {
    this.transData =  _.filter(this.state.proposerArray, item => {return item.id != tabId;});
    this.props.onChange({
      contractDetailProposer: this.unTransData(this.transData)
    });
  },
  activeTab(tabId) {
    this.setState({
      activeProposer: {component: DefaultHolder}
    });
    window.setTimeout(event => {
      this.setState({
        activeProposer: _.find(this.transData, {id: tabId})
      });
    }, 1);
  },
  onChange(values, proposerId) {
    var proposer = _.find(this.transData, {id: proposerId});
    proposer.data = _.extend(proposer.data, values);
    this.props.onChange({
      contractDetailProposer: this.unTransData(this.transData)
    });
  },
  render() {
    var { activeProposer } = this.state;
    var { proposersArrayMeta } = this.props;
    var Component = activeProposer.component;
    return (<div>
      <NavTab
        data={this.transData } addTab={this.addTab}
        removeTab={this.removeTab} activeTab={this.activeTab}
        active={activeProposer.id}
      />
      <div className="nav-content">
        <Component
          data={activeProposer.data} proposersArrayMeta={proposersArrayMeta}
          onChange={this.onChange} aid={activeProposer.id}
        />
      </div>
      <Inventor />
    </div>);
  }
});

module.exports = PersonInfo;
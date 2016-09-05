var React = require('react');
var NavTab = require('../../../../nav-tab/nav-tab');
var _ = require('underscore');
var Formsy = require('formsy-react');
var FormsyItem = require('../../../../form/Form-item-base');
/**
 * @type {__React.ClassicComponentClass<P>}
 * @desc PriorityForm Component
 */
var PriorityForm = React.createClass({
  getDefaultProps() {
    return {
    };
  },
  propTypes: {
    data: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },
  onFormChange(values) {
    var {onChange} = this.props;
    if (onChange) onChange(values);
  },
  onValid() {
  },
  render() {
    var {data} = this.props;
    return (<Formsy.Form
      onChange={this.onFormChange} ref="form" onValid={this.onValid}
    >
      <div className="nav-content">
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>在先申请号</label>
              <FormsyItem name="applyNo" value={data.applyNo || ''} validations="isInt" validationError="格式号有误"
                          required tips="请输入在线申请号" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>在先申请日</label>
              <FormsyItem name="applyDate" value={data.applyDate || ''}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>在先申请人</label>
              <FormsyItem name="proposerName" value={data.proposerName || ''}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>*在先申请国</label>
              <FormsyItem name="countryId" value={data.countryId || ''}/>
            </div>
          </div>
        </div>
      </div>
    </Formsy.Form>);
  }
});

/**
 * @type {__React.ClassicComponentClass<P>}
 * @desc 在先信息组件
 */
var Priority = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    data: React.PropTypes.array,
  },
  getDefaultProps() {
    return {
      data: []
    }
  },
  getInitialState() {
    var { data } = this.props;
    var transData = this.transData(data);
    return {
      activePriority: transData[0],
      transData: transData
    };
  },
  transData(data) {
    var transData = data.map(priorityData => {
      return {name: '优先权', id: _.uniqueId('priority-id-'), component: <PriorityForm />, data: priorityData}
    });
    return transData.length > 0 ? transData : [{name: '优先权', id: _.uniqueId('priority-id-'), component: <PriorityForm />, data: {}}];
  },
  unTransData(transData) {
    return transData.map(transData => {
      return transData.data;
    });
  },
  addTab() {
    var { transData } = this.state;
    var newTransData = transData.concat({name: '优先权', id: _.uniqueId('priority-id-'), component: <PriorityForm />, data: {}});
    this.setState({
      transData: newTransData
    });
  },
  removeTab(tabId) {
    // this.setState({
    //   priorityArray: _.filter(this.state.priorityArray, item => {return item.id != tabId;})
    // });
  },
  activeTab(tabId) {
    var { transData } = this.state;
    this.setState({
      activePriority: _.find(transData, {id: tabId})
    });
  },
  // reset values by tabId
  onChange(values, tabId) {
    var { onChange } = this.props;
    var { transData } = this.state;
    var priority = _.find(transData, {id: tabId});
    priority.data = values;
    onChange(this.unTransData(transData));
  },
  render() {
    var { activePriority, transData } = this.state;
    var Component = activePriority.component;
    return (
      <div>
          <NavTab
            data={transData} activeTab={this.activeTab}
            addTab={this.addTab} removeTab={this.removeTab}
            active={activePriority.id}
          />
        {React.cloneElement(Component, {
          data: activePriority.data,
          onChange: values => this.onChange(values, activePriority.id)
        })}
      </div>
    );
  }
});

module.exports = Priority;
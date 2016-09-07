var React = require('react');
var NavTab = require('../../../../nav-tab/nav-tab');
var _ = require('underscore');
var Datetime = require('react-datetime');
var moment = require('moment');
var FormSelectAysc = require('../../../../select/form-item-select-aysc');
var API = require('../../../../api');
var Formsy = require('formsy-react');
var FormsyItem = require('../../../../form/Form-item-base');
var FormItemDate = require('../../../../form/form-item-date');
var axios = require('axios');
require('moment/locale/zh-cn.js');
require('react-datetime/css/react-datetime.css');
require('./priority.less');
/**
 * @type {__React.ClassicComponentClass<P>}
 * @desc PriorityForm Component
 */
var PriorityForm = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    onChange: React.PropTypes.func,
    aid: React.PropTypes.any,
  },
  onFormChange(values, changed) {
    var { onChange, aid } = this.props;
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(event => {
      if (onChange) onChange(values, aid);
    }, 10)
  },
  onValid() {
  },
  getCountry() {
    // 获取所有国家
    return axios.post(API.getRegion, '', {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => {
      return {
        options: response.data.body.data,
      };
    });
  },
  render() {
    var {data} = this.props;
    return (<Formsy.Form
      onChange={this.onFormChange} ref="form" onValid={this.onValid}
    >
      <div className="nav-content Priority-form-wrapper">
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>在先申请号</label>
              <FormsyItem
                name="applyNo" value={data.applyNo || ''}
                validations="isInt" validationError="格式号有误"
                required tips="请输入在线申请号" autoComplete={false}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix date-picker">
              <label>在先申请日期</label>
              <FormsyItem name="applyDate">
                <FormItemDate
                  locale="zh-cn" dateFormat="YYYY-MM-DD" timeFormat={false}
                  closeOnSelect={true} defaultValue={data.applyDate || ''}
                />
              </FormsyItem>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>在先申请人</label>
              <FormsyItem
                name="proposerName" value={data.proposerName || ''}
                autoComplete={false}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>*在先申请国</label>
              <FormsyItem name="countryId" required tips="国籍" value={data.countryId}>
                <FormSelectAysc
                  loadOptions={this.getCountry} labelKey="name" valueKey="id"
                  value={data.countryId}
                />
              </FormsyItem>
            </div>
          </div>
        </div>
      </div>
    </Formsy.Form>);
  }
});

var DefaultHoder = React.createClass({
  render() {
    return (
      <div className="nav-content Priority-form-wrapper" style={{height: '108px'}}></div>
    );
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
    debugger;
    this.transData = this.transData(data);
    return {
      activePriority: this.transData[0],
    };
  },
  transData(data) {
    var transData = data.map(priorityData => {
      return {name: '优先权', id: _.uniqueId('priority-id-'), component: PriorityForm, data: priorityData}
    });
    return transData.length > 0 ? transData : [{name: '优先权', id: _.uniqueId('priority-id-'), component: PriorityForm, data: {}}];
  },
  unTransData(transData) {
    return transData.map(transData => {
      return transData.data;
    });
  },
  addTab() {
    this.transData= this.transData.concat({name: '优先权', id: _.uniqueId('priority-id-'), component: PriorityForm, data: {}});
    this.forceUpdate();
  },
  removeTab(tabId) {
    // this.setState({
    //   priorityArray: _.filter(this.state.priorityArray, item => {return item.id != tabId;})
    // });
  },
  activeTab(tabId) {
    this.setState({
      activePriority: {component: DefaultHoder}
    });
    window.setTimeout(event => {
      this.setState({
        activePriority: _.find(this.transData, {id: tabId})
      });
    }, 1);
  },
  // reset values by tabId
  onChange(values, tabId) {
    var { onChange } = this.props;
    var priority = _.find(this.transData, {id: tabId});
    _.extend(priority.data, values);
    onChange(this.unTransData(this.transData));
  },
  render() {
    var { activePriority } = this.state;
    var Component = activePriority.component;
    return (
      <div>
          <NavTab
            data={this.transData} activeTab={this.activeTab}
            addTab={this.addTab} removeTab={this.removeTab}
            active={activePriority.id}
          />
        <Component data={activePriority.data} onChange={this.onChange} aid={activePriority.id} />
      </div>
    );
  }
});

module.exports = Priority;
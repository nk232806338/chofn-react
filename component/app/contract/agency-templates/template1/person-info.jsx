var React = require('react');
var Formsy = require('formsy-react');
var _ = require('underscore');
var FormsyItem = require('../../../../form/Form-item-base');
var Select = require('react-select');
var NavTab = require('../../../../nav-tab/nav-tab');
require('react-select/dist/react-select.css');
var Uploader = require('../../../../uploader/uploader');
var Inventor = require('../common/inventors');
var MultipleRegionSelect = require('../../../../select/region/multiple-region-select');

var PersonInfo = React.createClass({
  propTypes: {
    proposersArrayInit: React.PropTypes.array,
  },
  getInitialState() {
    return {
      file: {name: '测试数据', url: '/uploads/logo.png'},
      proposerArray: [{name: '申请人', active: true, id: 'ffae'}]
    };
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
  render() {
    var { proposersArrayInit } = this.props;
    var { file, proposerArray } = this.state;
    return (<div>
      <NavTab
        data={proposerArray} addTab={this.addTab}
        removeTab={this.removeTab} activeTab={this.activeTab}
      />
      <div className="nav-content">
        <Formsy.Form onSubmit={this.submit} ref="form" className="person-info-form">
          <div className="row">
            <div className="col-sm-12">
              <div className="Form-item clearfix">
                <label>申请人名称</label>
                <FormsyItem name="pwd" required tips="申请人名称" value={proposersArrayInit && proposersArrayInit[0].proposerName}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>证件号</label>
                <FormsyItem name="pwd" required tips="证件号" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>名称(英文)</label>
                <FormsyItem name="pwd" required tips="名称(英文)" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>国籍</label>
                <FormsyItem name="pwd" required tips="证件号" >
                  <Select></Select>
                </FormsyItem>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>邮政编码</label>
                <FormsyItem name="pwd" required tips="邮政编码" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="Form-item clearfix" style={{width: '800px'}}>
                <label>申请人地址</label>
                <FormsyItem name="pwd" required tips="地址" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="Form-item clearfix">
                <label>地址</label>
                <div className="Form-item-base">
                  <MultipleRegionSelect />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>公章/签名</label>
                <div className="Form-item-base">
                  <Uploader
                    uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                    btnText="" data={file}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>营业,个体户/执照</label>
                <div className="Form-item-base">
                  <Uploader
                    uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                    btnText="" data={file}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>执照/护照翻译件</label>
                <div className="Form-item-base">
                  <Uploader
                    uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                    btnText="" data={file}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="Form-item clearfix">
                <label>身份证(正,反)/护照</label>
                <div className="Form-item-base">
                  <Uploader
                    uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                    btnText="" data={file}
                  />
                </div>
              </div>
            </div>
          </div>
        </Formsy.Form>
      </div>
      <Inventor />
    </div>);
  }
});

module.exports = PersonInfo;
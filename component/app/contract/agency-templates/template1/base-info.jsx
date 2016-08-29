var React = require('react');
var Formsy = require('formsy-react');
var _ = require('underscore');
var FormsyItem = require('../../../../form/Form-item-base');
var TemplatesRegistry = require('../TemplatesRegistry');
var Category  = require('../common/category');
var Radios = require('../../../../form/form-item-radios');
var NavTab = require('../../../../nav-tab/nav-tab');
require('../../../../form/form.less');
var Select = require('../../../../select/select-form.jsx');
var Uploader = require('../../../../uploader/uploader');

/**
 * @type {__React.ClassicComponentClass<P>}
 */
var BaseInfo = React. createClass({
  getInitialState() {
    return {
      categoryData: {},
      file: {name: '测试数据', url: '/uploads/logo.png'},
      priorityArray: [{name: '优先权', active: true, id: 'ffae'}],
      submitCheckOptions: [{value: '1', label: '是', checked: true}, {value: '2', label: '否'}]
    };
  },
  onOtherSelect(item) {
    
  },
  onCategoryChange(categoryData) {
    this.setState({
      categoryData: categoryData,
    });
  },
  onFileUploaded(file) {
    this.setState({
      file: file,
    });
  },
  onSubmitCheckChange(options) {
    this.setState({
      submitCheckOptions: options
    });
  },
  submit(model) {

  },
  addTab() {
    this.setState({
      priorityArray: this.state.priorityArray.concat({name: '优先权', id: _.uniqueId('priority-id-')})
    });
  },
  removeTab(tabId) {
    this.setState({
      priorityArray: _.filter(this.state.priorityArray, item => {return item.id != tabId;})
    });
  },
  activeTab(tabId) {
    var { priorityArray } = this.state;
    _.find(priorityArray, {active: true}).active = false;
    _.find(priorityArray, {id: tabId}).active = true;
    this.setState({
      priorityArray
    });
  },
  render() {
    var { categoryData, file, submitCheckOptions, priorityArray } = this.state;
    return (<div>
      <Formsy.Form onSubmit={this.submit} ref="form" className="base-info-form">
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix small">
              <label>方案类别</label>
              <div className="Form-item-base clearfix">
                <Category onChange={this.onCategoryChange} data={categoryData}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix small">
              <label>交底书名称</label>
              <FormsyItem name="pwd" required tips="交底书名称"  placeholder="交底书名称"/>
            </div>
          </div>
          {categoryData.hasClarificaitonbook ?
            <div className="col-sm-6">
              <div className="Form-item clearfix small">
                <label>上传交底书</label>
                <div className="Form-item-base">
                  <Uploader
                    uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                    btnText="上传交底书" data={file}
                  />
                </div>
              </div>
            </div> : null
          }
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>其它参考资料</label>
              <Uploader
                uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                btnText="上传文件" data={file}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>备注</label>
              <FormsyItem name="pwd" type="textarea" required tips="备注" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>是否提交实审请求</label>
              <FormsyItem name="submitCheck">
                <Radios
                  onChange={this.onSubmitCheckChange}
                  name="submitCheck" options={submitCheckOptions}
                />
              </FormsyItem>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>是否要求提前公开</label>
              <FormsyItem name="submitCheck">
                <Radios
                  onChange={this.onSubmitCheckChange}
                  name="submitCheck" options={submitCheckOptions}
                />
              </FormsyItem>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>返初搞时限</label>
              <FormsyItem name="timeLimit" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>费减信息</label>
              <FormsyItem name="submitCheck">
                <Select options={[
                  {value: 0, label: '无费减'},
                  {value: 5, label: '费减备案一类 85%'},
                  {value: 6, label: '费减备案二类 70%'},
                ]}
                        value={0}
                />
              </FormsyItem>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>风险代理</label>
              <FormsyItem name="submitCheck">
                <Select
                  options={[{value: 0, label: '无'}, {value: 1, label: '半风险'}, {value: 2, label: '全风险'}]}
                  value={0}
                />
              </FormsyItem>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>费减信息</label>
              <FormsyItem name="submitCheck">
                <Select options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}]}/>
              </FormsyItem>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>是否申请优先权</label>
              <FormsyItem name="submitCheck">
                <Radios
                  onChange={this.onSubmitCheckChange}
                  name="submitCheck" options={submitCheckOptions}
                />
              </FormsyItem>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <NavTab
                data={priorityArray} activeTab={this.activeTab}
                addTab={this.addTab} removeTab={this.removeTab}
              />
              <div className="nav-content">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="Form-item clearfix">
                      <label>在先申请号</label>
                      <FormsyItem name="timeLimit" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="Form-item clearfix">
                      <label>在先申请日</label>
                      <FormsyItem name="timeLimit" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="Form-item clearfix">
                      <label>在先申请人</label>
                      <FormsyItem name="timeLimit" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="Form-item clearfix">
                      <label>*在先申请国</label>
                      <FormsyItem name="timeLimit" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>权利要求项数</label>
              <FormsyItem name="timeLimit" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>说明书页数</label>
              <FormsyItem name="submitCheck">
              </FormsyItem>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>事项备注</label>
              <FormsyItem name="pwd" type="textarea" required tips="事项备注" />
            </div>
          </div>
        </div>
      </Formsy.Form>

    </div>);
  }
});

module.exports = BaseInfo;
// <div className="row">
//   <div className="col-sm-6">
//     <div className="Form-item clearfix">
//       <label>风险代理</label>
//       <FormsyItem name="submitCheck">
//         <div>
//           <div style={{float: 'left'}}><input type="checkbox" name="" id=""/>是否风险代理</div>
//           <div style={{float: 'left', width: '150px'}}>
//             <FormSelect />
//           </div>
//         </div>
//       </FormsyItem>
//     </div>
// </div>
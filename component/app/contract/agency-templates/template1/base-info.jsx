var React = require('react');
var Formsy = require('formsy-react');
var _ = require('underscore');
var FormsyItem = require('../../../../form/Form-item-base');
var TemplatesRegistry = require('../TemplatesRegistry');
var Category  = require('../common/category');
var Radios = require('../../../../form/form-item-radios');
var NavTab = require('../../../../nav-tab/nav-tab');
var Priority = require('../common/priority');
require('../../../../form/form.less');
var FormSelect = require('../../../../select/form-item-select');
var Uploader = require('../../../../uploader/uploader');
var API = require('../../../../api');
var FormItemNumber = require('../../../../form/form-item-number');
/**
 * @type {__React.ClassicComponentClass<P>}
 */
var BaseInfo = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    hasProject: React.PropTypes.any,
    hasPicture: React.PropTypes.any,
    hasClarificaitonbook: React.PropTypes.any,
    clarificaitonBookName: React.PropTypes.any,
    bookFile: React.PropTypes.any,
    priority: React.PropTypes.any, // 优先权数组
    clarificaitonRemark: React.PropTypes.any, // 技术交底书备注
    submitCheck: React.PropTypes.any, // 是否提交实审请求
    advancedPublic: React.PropTypes.any, // 是否要求提前公开
    timeLimit: React.PropTypes.any, // 返初搞时限
    isRisk: React.PropTypes.any, // 风险代理
  },
  getDefaultProps() {
    return {
      data: {}
    }
  },
  getInitialState() {
    this.timer = null;
    return {
      bookFile: {},
      file: {name: '测试数据', url: '/uploads/logo.png'},
    };
  },
  onOtherSelect(item) {
    
  },
  onCategoryChange(categoryData) {
    var { onChange } = this.props;
    onChange(categoryData);
  },
  onBookFileUploaded(fileArray) {
    this.setState({
      bookFile: fileArray
    });
  },
  onFileUploaded(fileArray) {
    this.setState({
      file: file,
    });
  },
  onSubmitCheckChange(options) {
  },
  submit(model) {

  },
  onFormChange() {
    var { onChange } = this.props;
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(event => {
      onChange(this.refs.form.getModel());
    }, 100);
  },
  onPriorityChange(priorityArray) {
    var { data, onChange } = this.props;
    data.priorityArray = priorityArray;
    onChange(data);
  },
  render() {
    var { file, bookFile } = this.state;
    var {
      hasProject, hasPicture, hasClarificaitonbook, clarificaitonRemark, timeLimit, isRisk,
      clarificaitonBookName, clarificaitonBookName, priority, submitCheck, advancedPublic
    } = this.props;
    return (<div>
      <Formsy.Form onChange={this.onFormChange}
        ref="form" className="base-info-form"
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix small">
              <label>方案类别</label>
              <div className="Form-item-base clearfix">
                <Category onChange={this.onCategoryChange} data={{
                  hasProject,
                  hasPicture,
                  hasClarificaitonbook
                }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix small">
              <label>交底书名称</label>
              <FormsyItem
                name="clarificaitonName"
                required tips="交底书名称"  placeholder="交底书名称" validations="minLength:1"
                validationErrors="请输入完整的交底书名称" value={clarificaitonBookName}
              />
            </div>
          </div>
          {hasClarificaitonbook ?
            <div className="col-sm-6">
              <div className="Form-item clearfix small">
                <label>上传交底书</label>
                <div className="Form-item-base">
                  <Uploader
                    uploadUrl={API.uploadFile} onFileUploaded={this.onBookFileUploaded}
                    btnText="上传交底书" data={{name: bookFile[0] && bookFile[0].file_name}} name="bookFile"
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
              <div className="Form-item-base">
                <Uploader
                  uploadUrl={API.uploadMultipleFile} onFileUploaded={this.onFileUploaded}
                  btnText="上传文件" data={file} name="otherFile"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>备注</label>
              <FormsyItem
                value={clarificaitonRemark || ''}
                name="clarificaitonRemark" type="textarea" required tips="备注"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>是否提交实审请求</label>
              <FormsyItem name="submitCheck">
                <Radios
                  value={submitCheck}
                  options={
                    [{value: "1", label: '是', checked: true}, {value: "0", label: '否'}]
                  }
                />
              </FormsyItem>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>是否要求提前公开</label>
              <FormsyItem name="advancedPublic">
                <Radios value={advancedPublic} options={[{value: "1", label: '是', checked: true}, {value: "0", label: '否'}]}/>
              </FormsyItem>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>返初搞时限</label>
              <FormsyItem name="timeLimit" >
                <FormItemNumber value={timeLimit}/>
              </FormsyItem>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>费减信息</label>
              <FormsyItem name="cutFee">
                <FormSelect
                  options={[
                    {value: 0, label: '无费减'},
                    {value: 5, label: '费减备案一类 85%'},
                    {value: 6, label: '费减备案二类 70%'},
                  ]} value={0}
                />
              </FormsyItem>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>风险代理</label>
              <FormsyItem name="isRisk">
                <FormSelect
                  clearable={false} valueKey="value" labelKey="label"
                  options={[{value: '0', label: '无'}, {value: '1', label: '半风险'}, {value: '2', label: '全风险'}]}
                  value={isRisk || '0'}
                />
              </FormsyItem>
            </div>
          </div>
          <div className="col-sm-6">
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>权利要求项数</label>
              <FormsyItem name="rightItemNum" value={''}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>说明书页数</label>
              <FormsyItem name="specificationPageNum" value={''} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>事项备注</label>
              <FormsyItem name="remark" type="textarea" required tips="事项备注" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="Form-item clearfix">
              <label>是否申请优先权</label>
              <FormsyItem name="isPriority">
                <Radios options={[{value: "1", label: '是', checked: true}, {value: "0", label: '否'}]}/>
              </FormsyItem>
            </div>
          </div>
        </div>
      </Formsy.Form>
      <div className="row">
        <div className="col-sm-12">
          <Priority onChange={this.onPriorityChange} data={priority}/>
        </div>
      </div>
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
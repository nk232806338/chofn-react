var React = require('react');
var Formsy = require('formsy-react');
var FormsyItem = require('../../../../form/Form-item-base');
var Select = require('react-select');
require('react-select/dist/react-select.css');
var Uploader = require('../../../../uploader/uploader');
var Inventor = require('../common/inventors');

var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + val);
}


var PersonInfo = React.createClass({
  getInitialState() {
    return {
      file: {name: '测试数据', url: '/uploads/logo.png'},
    };
  },
  render() {
    var { file } = this.state;
    return (<div>

      <Formsy.Form onSubmit={this.submit} ref="form">

        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>申请人名称</label>
              <FormsyItem name="pwd" required tips="申请人名称" />
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
            <div className="Form-item clearfix">
              <label>地址</label>
              <FormsyItem name="pwd" required tips="地址" />
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

        <Inventor />
      </Formsy.Form>
    </div>);
  }
});

module.exports = PersonInfo;
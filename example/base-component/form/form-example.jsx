var React = require('react');
var Formsy = require('formsy-react');
var _ = require('underscore');
var InputBase = require('../../../component/form/Form-item-base');
var InputAsyncValid = require('../../../component/form/input-async-valid');
require('../../../component/form/form.less');

var FormExample = React.createClass({
  getInitialState() {
    return {
      validateRepeat: null
    }
  },
  submit(model, reset, invalidate) {
  },
  onValidSubmit(model) {
    alert('成功提交');
  },
  asyncValidate(value, isValid) {
  },
  render() {
    return (<div style={{marginTop: '30px'}}>
      <Formsy.Form onSubmit={this.submit} ref="form" onValidSubmit={this.onValidSubmit}>
        <div className="Form-item clearfix">
          <label>邮箱</label>
          <InputAsyncValid
            name="email" validations="isEmail" validationError="您填写的邮箱格式有误"
            required tips="请输入您的邮箱,例如xxx@qq.com" placeholder="请输入您的邮箱"/>
        </div>
        <div className="Form-item clearfix">
          <label>数字</label>
          <InputBase name="num1" validations="isNumeric" validationError="您填写的数字格式有误" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
        </div>
        <div className="Form-item clearfix">
          <label>字母</label>
          <InputBase name="word" validations="isWords" validationError="只能包含英文字母" required tips="请输入英文字母" placeholder="请输入英文字母"/>
        </div>
        <div className="Form-item clearfix">
          <label>数字密码</label>
          <InputBase name="pwd" validations="isNumeric" validationError="密码仅允许为数字" required tips="请输入您的数字密码"  placeholder="请输入您的数字密码"/>
        </div>
        <div className="Form-item clearfix">
          <label>重复密码</label>
          <InputBase name="pwdRepeat" validations={{
            ifSameValid: function(values, value) {
              if (values.pwd != value) {
                return '新旧密码不一致';
              }
              return true;
            }
          }} required tips="请重复您的密码"  placeholder="请重复您的密码"/>
        </div>
        <button type="submit" className="btn btn-primary" style={{marginLeft: '140px'}}>提交</button>
      </Formsy.Form>
    </div>);
  }
});

module.exports = FormExample;
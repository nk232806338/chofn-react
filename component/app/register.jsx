var React = require('react');
var Formsy = require('formsy-react');
var InputBase = require('../form/Form-item-base');
var InputAsyncValid = require('../form/input-async-valid');
require('../form/form.less');
var Register = React.createClass({
  getInitialState() {
    return {
      validateRepeat: null
    }
  },
  submit(model, reset, invalidate) {
    // debugger;
  },
  asyncValidate(value, isValid) {
  },
  render() {
    return (<div style={{marginTop: '30px'}}>
      <Formsy.Form onSubmit={this.submit} ref="form">
        <div className="Form-item clearfix">
          <label>邮箱</label>
          <InputAsyncValid
            name="email" validations="isEmail" validationError="您填写的邮箱格式有误"
            required tips="请输入您的邮箱" placeholder="请输入您的邮箱"/>
        </div>
        <div className="Form-item clearfix">
          <label>数字</label>
          <InputBase name="pwd" validations="isNumeric" validationError="您填写的数字格式有误" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
        </div>
        <div className="Form-item clearfix">
          <label>数字</label>
          <InputBase name="pwd" validations="isNumeric" validationError="您填写的数字格式有误" required tips="请输入您的数字" placeholder="请输入您的数字"/>
        </div>
        <div className="Form-item clearfix">
          <label>数字</label>
          <InputBase name="pwd" validations="isNumeric" validationError="您填写的数字格式有误" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
        </div>
        <div className="Form-item clearfix">
          <label>数字</label>
          <InputBase name="pwd" validations="isNumeric" validationError="您填写的数字格式有误" required tips="请输入您的数字"  placeholder="请输入您的数字"/>
        </div>
        <button type="submit">Submit</button>
      </Formsy.Form>
    </div>);
  }
});

module.exports = Register;
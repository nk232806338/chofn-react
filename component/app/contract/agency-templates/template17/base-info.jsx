var React = require('react');
var Formsy = require('formsy-react');
var InputBase = require('../../../../form/Form-item-base');
require('../../../../form/form.less');
var Select = require('../../../../select/select-base');

var FormSelect = React.createClass({
  propTypes: {
    handleFocus: React.PropTypes.func,
    handleBlur: React.PropTypes.func,
  },
  onToggleShow(show) {
    var { handleFocus, handleBlur } = this.props;
    if (show) {
      handleFocus();
    } else {
      handleBlur();
    }
  },
  render() {
    return (<div>
      <Select data={[{id:1, name: 1}, {id:2, name: 2}]} onSelect={this.onOtherSelect} onToggleShow={this.onToggleShow}/>
    </div>);
  }
});

var BaseInfo = React.createClass({
  onOtherSelect(item) {
    
  },
  render() {
    return (<div>
      <Formsy.Form onSubmit={this.submit} ref="form">
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix small">
              <label>方案类别</label>
              <div className="Form-item-base clearfix">
                <label htmlFor=""><input type="checkbox" name="" id=""/>有方案</label>
                <label htmlFor=""><input type="checkbox" name="" id=""/>有交底</label>
                <label htmlFor=""><input type="checkbox" name="" id=""/>有图</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix small">
              <label>交底书名称</label>
              <InputBase name="pwd" required tips="交底书名称"  placeholder="交底书名称"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>其它参考</label>
              <InputBase name="other" required validations="isInt" tips="请选择其它参考">
                <FormSelect />
              </InputBase>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Form-item clearfix">
              <label>备注</label>
              <InputBase name="pwd" type="textarea" required tips="备注" />
            </div>
          </div>
        </div>
      </Formsy.Form>

    </div>);
  }
});

module.exports = BaseInfo;
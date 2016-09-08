var React = require('react');
var Formsy = require('formsy-react');
var FormsyItem = require('../../../../form/Form-item-base');
var FormItemCheckbox = require('../../../../form/form-item-checkbox');
var FormSelect = require('../../../../select/form-item-select');
require('./price-opt.less');
var PriceOpt = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    isRebate: React.PropTypes.any,
    isStages: React.PropTypes.any,
    hasDivideConsultant: React.PropTypes.any,
  },
  onChange() {
    var { onChange } = this.props;
    var model = this.refs.form.getModel();
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(event => {
      onChange(model);
    }, 10);
  },
  render() {
    return (<div>
      <Formsy.Form onChange={this.onChange} ref="form" className="price-opt-wrapper">
        <div className="row">
          {this.props.isStages != '1' ? <div className="col-sm-2">
            <div className="Form-item clearfix for-label">
              <label htmlFor="isRebate">
                返点
              </label>
              <FormsyItem name="isRebate" >
                <FormItemCheckbox id="isRebate"
                  options={{checkedValue: '1', unCheckValue: '0'}} value={this.props.isRebate || '0'}
                />
              </FormsyItem>
            </div>
          </div> : null}
          {this.props.isRebate == '1' ?  <div>
            <div className="col-sm-3">
              <div className="Form-item clearfix small">
                <label>合作者</label>
                <FormsyItem name="pwd" required tips="合作者" />
              </div>
            </div>
            <div className="col-sm-5">
              <div className="Form-item clearfix small">
                <label>返点</label>
                <FormsyItem name="pwd" required tips="返点" />
              </div>
            </div>
          </div> : null}
        </div>

        {this.props.isRebate != '1' ? <div className="row">
          <div className="col-sm-2">
            <div className="Form-item clearfix for-label">
              <label htmlFor="isStages">
                分期付款
              </label>
              <FormsyItem name="isStages" >
                <FormItemCheckbox
                  id="isStages"
                  options={{checkedValue: '1', unCheckValue: '0'}} value={this.props.isStages || '0'}
                />
              </FormsyItem>
            </div>
          </div>
          {this.props.isStages == 1 ? <div>
            <div className="col-sm-3">
              <div className="Form-item clearfix small">
                <label>分期首付</label>
                <FormsyItem name="pwd" required tips="备注" />
              </div>
            </div>
            <div className="col-sm-5">
              <div className="Form-item clearfix small">
                <label>尾款方式</label>
                <FormsyItem name="pwd" required tips="备注" type="textarea" />
              </div>
            </div>
          </div> : null}
        </div> : null}

        <div className="row">
          <div className="col-sm-2">
            <div className="Form-item clearfix for-label">
              <label htmlFor="hasDivideConsultant">
                分成顾问
              </label>
              <FormsyItem name="hasDivideConsultant" >
                <FormItemCheckbox
                  id="hasDivideConsultant"
                  options={{checkedValue: '1', unCheckValue: '0'}} value={this.props.hasDivideConsultant || '0'}
                />
              </FormsyItem>
            </div>
          </div>
          {this.props.hasDivideConsultant == '1' ?
          <div className="row col-sm-10">
            <div className="col-sm-4">
              <div className="Form-item clearfix small">
                <label>当前顾问</label>
                <FormsyItem name="pwd" required tips="当前顾问" disabled={true}/>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="Form-item clearfix small">
                <label>分成比例</label>
                <div className="Form-item-base">
                  <p style={{marginTop: '6px'}}>10%</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="Form-item clearfix small">
                <label>提成顾问</label>
                <FormsyItem name="pwd" required tips="提成顾问" />
              </div>
            </div>
            <div className="col-sm-5">
              <div className="Form-item clearfix small">
                <label>分成比例</label>
                <FormsyItem name="pwd" required tips="分成比例">
                  <FormSelect
                    clearable={false}
                    options={[{label: '10%', value: '10%'}]} value="10%"
                  />
                </FormsyItem>
              </div>
            </div>
          </div> : null}

        </div>
      </Formsy.Form>

    </div>);
  }
});

module.exports = PriceOpt;
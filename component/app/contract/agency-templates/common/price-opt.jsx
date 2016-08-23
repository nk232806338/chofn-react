var React = require('react');
var Formsy = require('formsy-react');
var FormsyItem = require('../../../../form/Form-item-base');
require('./price-opt.less');
var PriceOpt = React.createClass({
  render() {
    return (<div>
      <Formsy.Form onSubmit={this.submit} ref="form" className="price-opt-wrapper">
        <div className="row">
          <div className="col-sm-2">
            <div className="Form-item-base">
              <label htmlFor="">返点<input type="checkbox" name="" id=""/></label>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="Form-item clearfix small">
              <label>方案类别</label>
              <FormsyItem name="pwd" required tips="备注" />
            </div>
          </div>
          <div className="col-sm-5">
            <div className="Form-item clearfix small">
              <label>方案类别</label>
              <FormsyItem name="pwd" required tips="备注"/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-2">
            <div className="Form-item-base">
              <label htmlFor="">分期付款<input type="checkbox" name="" id=""/></label>
            </div>
          </div>
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
        </div>

        <div className="row">
          <div className="col-sm-2">
            <div className="Form-item-base">
              <label htmlFor="">分成顾问<input type="checkbox" name="" id=""/></label>
            </div>
          </div>
          <div className="row col-sm-10">
            <div className="col-sm-4">
              <div className="Form-item clearfix small">
                <label>当前顾问</label>
                <FormsyItem name="pwd" required tips="备注" />
              </div>
            </div>
            <div className="col-sm-5">
              <div className="Form-item clearfix small">
                <label>分成比例</label>
                <FormsyItem name="pwd" required tips="备注"/>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="Form-item clearfix small">
                <label>当前顾问</label>
                <FormsyItem name="pwd" required tips="备注" />
              </div>
            </div>
            <div className="col-sm-5">
              <div className="Form-item clearfix small">
                <label>分成比例</label>
                <FormsyItem name="pwd" required tips="备注"/>
              </div>
            </div>
          </div>

        </div>
      </Formsy.Form>

    </div>);
  }
});

module.exports = PriceOpt;
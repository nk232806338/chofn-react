var React = require('react');
var PriceOpt = require('../common/price-opt');
var Formsy = require('formsy-react');
var FormsyItem = require('../../../../form/Form-item-base');
require('./price-info.less');
var PriceInfo = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
  },
  onTableChange() {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(event => {
      console.info(this.refs.tableForm.getModel());
    }, 100);
  },
  optChange(optFormModel) {
    var { onChange} = this.props;
    onChange(optFormModel);
  },
  render() {
    var { onChange, ...others } = this.props;
    return (<div>
      <Formsy.Form ref="tableForm" className="price-info-table" onChange={this.onTableChange}>
        <table className="table">
          <thead>
            <tr>
              <th width="20%">费用类别</th>
              <th width="50%">名义</th>
              <th width="30%">金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">代理费</td>
              <td>【国内专利发明】代理费</td>
              <td>
                <FormsyItem name="pwd"/>
              </td>
            </tr>
            <tr>
              <td>【国内实用新型】代理费</td>
              <td>
                <FormsyItem name="pwd"/>
              </td>
            </tr>
            <tr>
              <td rowSpan="2">附加费</td>
              <td>交底书撰写费</td>
              <td>
                <FormsyItem name="pwd"/>
              </td>
            </tr>
            <tr>
              <td>制图费</td>
              <td>
                <FormsyItem name="pwd"/>
              </td>
            </tr>
            <tr>
              <td rowSpan="4">官费</td>
              <td>【国内专利发明】实质审查费</td>
              <td>2500</td>
            </tr>
            <tr>
              <td>【国内专利发明】文件印刷费</td>
              <td>50</td>
            </tr>
            <tr>
              <td>【国内专利发明】申请费</td>
              <td>900</td>
            </tr>
            <tr>
              <td>【国内实用新型】申请费</td>
              <td>500</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>合计</td>
              <td>12450</td>
            </tr>
          </tfoot>
        </table>
      </Formsy.Form>

      <PriceOpt {...others} onChange={this.optChange}></PriceOpt>
    </div>);
  }
});

module.exports = PriceInfo;
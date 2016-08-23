var React = require('react');
var PriceOpt = require('../common/price-opt');
var PriceInfo = React.createClass({

  render() {

    return (<div>
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
            <td><input type="text"/></td>
          </tr>
          <tr>
            <td>【国内实用新型】代理费</td>
            <td><input type="text"/></td>
          </tr>

          <tr>
            <td rowSpan="2">附加费</td>
            <td>交底书撰写费</td>
            <td><input type="text"/></td>
          </tr>
          <tr>
            <td>制图费</td>
            <td><input type="text"/></td>
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

      <PriceOpt></PriceOpt>

    </div>);
  }
});

module.exports = PriceInfo;
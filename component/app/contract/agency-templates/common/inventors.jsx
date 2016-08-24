var React = require('react');
var Select = require('../../../../select/select');
var Uploader = require('../../../../uploader/uploader');
var _ = require('underscore');
require('./inventors.less');
var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + val);
}
var Inventor = React.createClass({
  propTypes: {
    data: React.PropTypes.any
  },
  componentDidMount() {
    console.info('why Inventor componentDidMount???');
  },
  getInitialState() {
    return {
      value: 'one',
      data: [1, 2, 3],
    };
  },
  setValue(value) {
    this.setState({ value });
  },
  render() {
    var data = [1, 2];
    return (<div className="Inventors-mod">
      <table className="table">
        <thead>
          <tr>
            <th width="10"></th>
            <th width="140">姓名</th>
            <th width="100">证件类型</th>
            <th width="160">证件号</th>
            <th width="160">证件扫描件</th>
            <th width="120">国家地区</th>
            <th width="80">公布姓名</th>
            <th width="100">数据状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        {data.map(inventor => {
          var id = _.uniqueId('tr-inventor-');
          return (
            <tr key={id}>
              <td>
                1
              </td>
              <td>
                <Select
                  name="form-field-name"
                  value="one"
                  clearable={false}
                  options={options}
                  onChange={logChange}
                />
              </td>
              <td>
                <Select
                  clearable={false}
                  searchable={false}
                  name="form-field-name"
                  value={this.state.value}
                  options={[{value: 1, label: '军官证'}, {value: 2, label: '身份证'}]}
                  onChange={this.setValue}
                />
              </td>
              <td>
                <div className="Form-item-base">
                  <input type="text"/>
                </div>
              </td>
              <td>
                <Uploader
                  uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                  btnText="" data
                />
              </td>
              <td>
                <Select
                  name="form-field-name"
                  clearable={false}
                  value={this.state.value}
                  options={options}
                  onChange={logChange}
                />
              </td>
              <td>
                <input type="checkbox" name="" id=""/>
              </td>
              <td>
                编辑
              </td>
              <td>
                <div className="td-opt-wrapper">
                  <a>添加</a>
                  <a>删除</a>
                  <a><span className="glyphicon glyphicon-arrow-up"></span></a>
                  <a><span className="glyphicon glyphicon-arrow-down"></span></a>
                </div>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>);
  }
});

module.exports = Inventor;
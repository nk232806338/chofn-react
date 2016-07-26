var React = require('react');
var SelectBase = require('../../../component/select/select-base');
var data = [
  {id: 1, name: '选项1'},
  {id: 2, name: '选项2'},
  {id: 3, name: '选项3'},
  {id: 4, name: '选项4'},
  {id: 5, name: '选项5'},
  {id: 6, name: '选项6'},
  {id: 7, name: '选项7'},
  {id: 8, name: '选项8'},
];
var data2 = [
  {id: 1, name: '商品1'},
  {id: 2, name: '商品2'},
  {id: 3, name: '商品3'},
  {id: 4, name: '商品4'},
  {id: 5, name: '商品5'},
  {id: 6, name: '商品6'},
  {id: 7, name: '商品7'},
  {id: 8, name: '商品8'},
];
var SelectExample = React.createClass({
  onSelect1() {

  },
  onSelect2() {

  },
  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">基础select</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-3">
                <SelectBase data={data} onSelect={this.onSelect1} />
              </div>
              <div className="col-sm-3">
                <SelectBase data={data2} onSelect={this.onSelect2} />
              </div>
              <div className="col-sm-3">
              </div>
              <div className="col-sm-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SelectExample;
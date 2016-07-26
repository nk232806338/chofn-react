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
  getInitialState() {
    return {
      select1: null,
      select2: null,
    };
  },
  onSelect1(item) {
    this.setState({
      select1: item
    });
  },
  onSelect2(item) {
    this.setState({
      select2: item
    });
  },
  render() {
    var { select1, select2 } = this.state;
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">基础select</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-3">
                <SelectBase data={data} onSelect={this.onSelect1} />
                { select1 ? <span>用户选择了: {select1.name}</span> : null}
              </div>
              <div className="col-sm-3">
                <SelectBase data={data2} onSelect={this.onSelect2} />
                { select2 ? <span>用户选择了: {select2.name}</span> : null}
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
var React = require('react');
var _ = require('underscore');
require('./table-base.less');
var TestData = [
  {id: 1, name: '用户1', status: 1},
  {id: 2, name: '用户2', status: 1},
  {id: 3, name: '用户3', status: 1},
  {id: 4, name: '用户4', status: 1},
  {id: 5, name: '用户5', status: 1},
  {id: 6, name: '用户6', status: 1},
  {id: 7, name: '用户7', status: 1},
];

var TableBase = React.createClass({
  propTypes: {
    hasIndex: React.PropTypes.bool
  },
  getInitialState() {
    return {
      data: TestData
    };
  },
  render() {
    var { data } = this.state;
    var { children, hasIndex } = this.props;
    return (<div className="Table-base">
      <table className="table table-hover">
        <thead>
          <tr>
            {hasIndex ? <th className="th-index">序号</th> : null }
            {children.map(Column => {
              var header = Column.props.header;
              return (
                <th key={_.uniqueId('Table-thead-th-')}>{header.name}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
        {
          data.map((tr, index) => {
            return (
              <tr key={tr.id}>
                {hasIndex ? <th scope='row'>{index + 1}</th> : null}
                {children.map(Column => {
                  var td = Column.props.td;
                  return (
                    <td key={_.uniqueId('Table-td-')}>{tr[td.key]}</td>
                  );
                })}
              </tr>
            )}
          )
        }
        </tbody>
      </table>
    </div>);
  }
});
TableBase.Column = React.createClass({
  render() {
    return null;
  }
});
module.exports = TableBase;
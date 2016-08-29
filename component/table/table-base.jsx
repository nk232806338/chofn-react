var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
require('./table-base.less');

var TableBase = React.createClass({
  propTypes: {
    hasIndex: React.PropTypes.bool,
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onDoubleClick: React.PropTypes.func,
  },
  getDefaultProps() {
  },
  getInitialState() {
    return {
      data: this.props.data
    };
  },
  componentWillUpdate(nextProps, nextState) {
    if (this.state.data != nextProps.data) {
      this.setState({
        data: nextProps.data
      });
    }
  },
  activeTr(tr, event) {
    var { data } = this.state;
    var { onSelect } = this.props;
    _.each(data, trData => trData.active = false);
    tr.active = true;
    if (onSelect) onSelect(tr);
    this.setState({data});
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
              <tr
                className={classNames({selected: tr.active})}
                key={tr.id} onClick={event => this.activeTr(tr, event)}>
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
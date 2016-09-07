var React = require('react');
var Select = require('react-select');

var FormItemSelectAysc = React.createClass({
  propTypes: {
    changeValue: React.PropTypes.func,
    value: React.PropTypes.any,
  },
  getInitialState() {
    return {
    }
  },
  componentDidMount() {
    var { changeValue, value } = this.props;
    if (value) {
      changeValue(value);
    }
  },
  onChange(activeOption) {
    var { changeValue, valueKey } = this.props;
    changeValue(activeOption[valueKey]);
  },
  render() {
    var { ...others, value } = this.props;
    return (<div>
      <Select.Async
        {...others } clearable={false}
        onChange={this.onChange} value={value}
      />
    </div>);
  }
});

module.exports = FormItemSelectAysc;
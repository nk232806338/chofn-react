var React = require('react');
var Select = require('react-select');

var FormItemSelectAysc = React.createClass({
  propTypes: {
    changeValue: React.PropTypes.func,
  },
  getInitialState() {
    return {
      value: this.props.value
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
    this.setState({
      value: activeOption[valueKey]
    });
  },
  render() {
    var { ...others } = this.props;
    var { value } = this.state;
    return (<div>
      <Select.Async
        {...others } clearable={false}
        onChange={this.onChange} value={value}
      />
    </div>);
  }
});

module.exports = FormItemSelectAysc;
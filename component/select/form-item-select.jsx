var React = require('react');
var Select = require('react-select');

var FormItemSelect = React.createClass({
  propTypes: {
    changeValue: React.PropTypes.func,
    onChange: React.PropTypes.func,
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
  componentWillUpdate(nextProps, nextState) {
    var { changeValue } = this.props;
    if (nextProps.value != this.state.value) {
      this.setState({
        value: nextProps.value
      });
      changeValue(nextProps.value);
    }
  },
  onChange(activeOption) {
    var { changeValue, onChange, valueKey } = this.props;
    // debugger;
    changeValue(activeOption[valueKey]);
    if (onChange) onChange(activeOption);
  },
  render() {
    var { ...others } = this.props;
    return (<div>
      <Select {...others } onChange={this.onChange} value={this.props.value}/>
    </div>);
  }
});

module.exports = FormItemSelect;
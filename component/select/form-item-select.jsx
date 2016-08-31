var React = require('react');
var Select = require('react-select');

var FormItemSelect = React.createClass({
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
    var { changeValue } = this.props;
    changeValue(activeOption.value);
    this.setState({
      value: activeOption.value
    });
  },
  render() {
    var { ...others } = this.props;
    var { value } = this.state;
    return (<div>
      <Select {...others } onChange={this.onChange} value={value}/>
    </div>);
  }
});

module.exports = FormItemSelect
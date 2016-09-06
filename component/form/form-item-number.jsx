var React = require('react');
var _ = require('underscore');
require('./form-item-number.less');
/**
 * @desc 【基础form组件--仅限制可输入数字,并有增减操作】
 */
var FormItemNumber = React.createClass({
  propTypes: {
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    max: React.PropTypes.number,
    min: React.PropTypes.any,
  },
  getDefaultProps() {
    return {
      max: 99,
      min: 0,
    };
  },
  getInitialState() {
    return {
      value: this.props.value || this.props.min,
    };
  },
  onChange(event) {
    // 由Formsy包装层传递下来
    var { onChange, changeValue, max, min } = this.props;
    var value = event.target.value;
    if (!isNaN(value)) {
      if (value > max) {
        value = max;
      }
      this.setState({
        value: parseInt(value)
      });
      if (onChange) onChange(parseInt(value));
    }
  },
  componentDidMount() {

  },
  add() {
    var { value } = this.state;
    var { changeValue, max, onChange } = this.props;
    var result = value >= max ? parseInt(value) : parseInt(value) + 1;
    this.setState({
      value: result
    });
    if (onChange) onChange(result);
    changeValue(result);
  },
  sub() {
    var { value } = this.state;
    var { changeValue, min, onChange } = this.props;
    var result = value <= min ? parseInt(value) : parseInt(value) - 1;
    this.setState({
      value: result
    });
    if (onChange) onChange(result);
    changeValue(result);
  },
  render() {
    var { value } = this.state;
    return (<div className="Form-item-number">
      <a onClick={this.sub}>
        <span className="glyphicon glyphicon-minus" />
      </a>
      <input type="text" onChange={this.onChange} value={value || 0} />
      <a onClick={this.add}>
        <span className="glyphicon glyphicon-plus" />
      </a>
    </div>);
  }
});

module.exports = FormItemNumber;

var React = require('react');
var _ = require('underscore');
/**
 * @desc 【基础form组件--checkbox】
 */
var FormItemCheckbox = React.createClass({
  propTypes: {
    options: React.PropTypes.any,
    onChange: React.PropTypes.func,
  },
  getInitialState() {
    return {
      options: this.props.options,
    };
  },
  onChange(event) {
    // 由Formsy包装层传递下来
    var { changeValue, options, onChange } = this.props;
    if (event.target.checked) {
      changeValue(options.checkedValue);
      if (onChange) onChange(true);
    } else {
      changeValue(options.unCheckValue);
      if (onChange) onChange(false);
    }
  },
  componentDidMount() {
    var { changeValue, value } = this.props;
    changeValue(value);
  },
  render() {
    var { options, value, ...others } = this.props;
    return (
      <input type="checkbox" onChange={this.onChange} checked={value == options.checkedValue} {...others}/>
    );
  }
});

module.exports = FormItemCheckbox;

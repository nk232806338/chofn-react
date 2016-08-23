var React = require('react');
var _ = require('underscore');
/**
 * @desc 【基础form组件--radios】
 */
var FormItemRadios = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired, // radio的form-name
    options: React.PropTypes.array.isRequired, // [{value:1, label: '是', checked: true}, {value:-1, label: '否'}....]
    onChange: React.PropTypes.func,
  },
  onChange(event) {
    // 由Formsy包装层传递下来
    var { changeValue, onChange, options } = this.props;
    if (event.target.checked) {
      changeValue(event.target.value);
    }
    options.forEach(option => {
      if (option.checked) option.checked = false;
    });
    _.find(options, {value: event.target.value}).checked = true;
    if (onChange) {
      onChange(options);
    }
  },
  render() {
    var { name, options } = this.props;
    return (<div onChange={this.onChange}>
      {options.map(option => {
        var id = _.uniqueId('radio-option-');
        return (
          <label htmlFor={id} key={'key-' + id}>
            <input type="radio" name={name} id={id} value={option.value} defaultChecked={option.checked}/>
            {option.label}
          </label>
        );
      })}
    </div>);
  }
});

module.exports = FormItemRadios;

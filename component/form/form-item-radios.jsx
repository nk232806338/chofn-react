var React = require('react');
var _ = require('underscore');
/**
 * @desc 【基础form组件--radios】
 */
var FormItemRadios = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired, // [{value:1, label: '是', checked: true}, {value:-1, label: '否'}....]
    onChange: React.PropTypes.func,
  },
  getInitialState() {
    return {
      options: this.props.options,
    };
  },
  onChange(event) {
    // 由Formsy包装层传递下来
    var { changeValue, onChange, options, name } = this.props;
    if (event.target.checked) {
      changeValue(event.target.value);
    }
    options.forEach(option => {
      if (option.checked) option.checked = false;
    });
    _.find(options, {value: event.target.value}).checked = true;
    // if (onChange) {
    //   var result = {};
    //   result[name] = event.target.value;
    //   onChange(result);
    // }
    this.setState({
      options
    });
  },
  componentDidMount() {
    var { changeValue, options } = this.props;
    var defaultCheckOption = _.find(options, {checked: true});
    if (defaultCheckOption) {
      changeValue(defaultCheckOption.value);
    }
  },
  render() {
    var { name } = this.props;
    var { options } = this.state;
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

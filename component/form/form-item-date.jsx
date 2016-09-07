var React = require('react');
var _ = require('underscore');
var Datetime = require('react-datetime');

/**
 * @desc 【基础form组件--date】
 */
var FormItemDate = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
  },
  getInitialState() {
    return {
      options: this.props.options,
    };
  },
  onChange(moment) {
    // 由Formsy包装层传递下来
    var { changeValue, dateFormat} = this.props;
    changeValue(moment.format(dateFormat || 'YYYY-MM-DD'));
  },
  componentDidMount() {
    var { changeValue, defaultValue } = this.props;
    changeValue(defaultValue);
  },
  render() {
    return (<div className="Form-item-base">
      <Datetime {...this.props} onChange={this.onChange}/>
    </div>);
  }
});

module.exports = FormItemDate;

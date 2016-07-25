var React = require('react');
var SelectBase = require('./select-base');

var SelectForm = React.createClass({
  propTypes: {
    handleFocus: React.PropTypes.func,
    handleBlur: React.PropTypes.func,
  },
  onToggleShow(show) {
    var { handleFocus, handleBlur } = this.props;
    if (show) {
      handleFocus();
    } else {
      handleBlur();
    }
  },
  render() {
    var { test, ...others } = this.props;
    return (<div>
      <SelectBase {...others } onToggleShow={this.onToggleShow}/>
    </div>);
  }
});

module.exports = SelectForm
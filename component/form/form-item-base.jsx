var React = require('react');
var Formsy = require('formsy-react');
require('./Form-item-base.less');
var FormItemBase = React.createClass({
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],
  propTypes: {
    tips: React.PropTypes.string, // for a normal tips when user focus a form-item
    handleBlur: React.PropTypes.func,
  },
  getInitialState() {
    return {
      isFocused: false,
    }
  },
  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(value) {
    this.setValue(value);
  },
  handleFocus() {
    this.setState({
      isFocused: true
    });
  },
  handleBlur(value) {
    var { handleBlur } = this.props;
    if (handleBlur) {
      handleBlur(value, this.isValid());
    }
    this.setState({
      isFocused: false
    });
  },
  render() {
    var { isFocused } = this.state;
    var { tips, type, required, children, ...others } = this.props;
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    // const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    var ifRequired = this.showRequired() && this.isFormSubmitted();
    var className = '';
    if (isFocused) {
      className += ' is-focused';
    } else if (this.showError()) {
      className += ' error';
    // ifRequired also show error msg
    } else if (ifRequired) {
      className += ' error';
    }
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    if (children) {
      return (<div className={'Form-item-base clearfix' + className}>
        {React.cloneElement(children, {
          handleBlur: this.handleBlur,
          handleFocus: this.handleFocus,
          changeValue: this.changeValue,
        })}
        <div className="tips-wrapper">
          <span>
            { isFocused || ifRequired ? tips : errorMessage}
          </span>
        </div>
      </div>);
    }
    var Component = 'input';
    if (type == 'textarea') {
      Component = 'textarea';
    }
    return (
      <div className={'Form-item-base clearfix' + className}>
        <Component
          {...others} type={type ? type : 'text'} onChange={event => this.changeValue(event.currentTarget.value, event)}
          value={this.getValue()}
          onFocus={this.handleFocus} onBlur={event => this.handleBlur(event.target.value, event)}
        />
        <div className="tips-wrapper">
          <span>
            { isFocused || ifRequired ? tips : errorMessage}
          </span>
        </div>
      </div>
    );
  }
});

module.exports = FormItemBase;
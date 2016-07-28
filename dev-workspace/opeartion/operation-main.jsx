var React = require('react');
var _ = require('underscore');
require('./operation.less');

var OperationMain = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    data: React.PropTypes.array,
    onColorChange: React.PropTypes.func,
  },
  getInitialState() {
    var { data } = this.props;
    return {
      data
    };
  },
  componentDidMount() {
    var { onColorChange } = this.props;
    var input = document.createElement('INPUT')
    input.value = '333333';
    input.addEventListener('change', (event) => {
      console.info(event.target.value);
      onColorChange(event.target.value);
    });
    var picker = new jscolor(input);
    picker.fromHSV('605359')
    this.refs.color_picker_wrapper.appendChild(input);
  },
  onChange(iTextInstance, value) {
    var { data } = this.state;
    var { onChange } = this.props;
    _.find(data, {id: iTextInstance.id}).text = value;
    this.setState({
      data
    });
    onChange(data);
  },
  render() {
    var { data } = this.state;
    return (<div className="Operation-mod">
      <div className="row">
        <div className="col-sm-3">
          <button type="button" className="btn btn-primary" onClick={this.showCustomerDialog} style={{marginBottom: '15px'}}>
            <span className="glyphicon glyphicon-search" aria-hidden="true" style={{marginRight: '4px'}}/>添加文本
          </button>
          <div ref="color_picker_wrapper"></div>
        </div>
        <div className="col-sm-3">
        </div>
        <div className="col-sm-3">
        </div>
        <div className="col-sm-3">
        </div>
      </div>
      {data.map(iTextInstance => <div className="row" key={iTextInstance.id}>
        <div className="col-sm-12">
          <input type="text" onChange={event => {this.onChange(iTextInstance, event.target.value)}} value={iTextInstance.text}/>
        </div>
      </div>)}

    </div>);
  }
});

module.exports = OperationMain;
var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
var SelectBase = require('../../component/select/select-base');
require('./operation.less');
var loading = require('../assets/loading.gif');

var OperationMain = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    data: React.PropTypes.array,
    onColorChange: React.PropTypes.func,
    onFileChange: React.PropTypes.func,
    onBgFileChange: React.PropTypes.func,
    onSave: React.PropTypes.func,
    addIText: React.PropTypes.func,
    deleteIText: React.PropTypes.func,
    onActive: React.PropTypes.func,
    defaultFontColor: React.PropTypes.string,
    isUploading: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    templatesData: React.PropTypes.array,
  },
  getInitialState() {
    return {
      toggleBar: true
    };
  },
  componentDidMount() {
    var { onColorChange, defaultFontColor } = this.props;
    var input = document.createElement('INPUT')
    input.value = defaultFontColor;
    input.addEventListener('change', (event) => {
      console.info(event.target.value);
      onColorChange(event.target.value);
    });
    var picker = new jscolor(input);
    picker.fromHSV('605359')
    this.refs.color_picker_wrapper.appendChild(input);
  },
  addIText() {
    this.props.addIText();
  },
  deleteIText(iTextNodeId) {
    this.props.deleteIText(iTextNodeId);
  },
  onChange(iTextInstance, value) {
    var { data, onChange } = this.props;
    _.find(data, {id: iTextInstance.id}).text = value;
    this.setState({
      data
    });
    onChange(data);
  },
  onFileChange(event) {
    var { onFileChange } = this.props;
    onFileChange(event.target.files[0]);
  },
  toggleBar() {
    this.setState({
      toggleBar: !this.state.toggleBar
    });
  },
  onSelect(templateData) {
    this.props.onSelect(templateData);
  },
  onSave() {
    this.props.onSave();
  },
  render() {
    var { toggleBar } = this.state;
    var { data, onActive, isUploading, templatesData, onBgFileChange } = this.props;
    return (<div className={classNames('Operation-mod', {show: toggleBar})}>
      <div className="toggle-bar" onClick={this.toggleBar}>
        { toggleBar ? <span className="glyphicon glyphicon-chevron-right" /> : <span className="glyphicon glyphicon-chevron-left" />}
      </div>
      <div className="Operation-mod-inner">
        {isUploading ? <div className="Operation-mod-overlayer">
          <div className="tips">上传中...<img src={loading}/></div>
        </div> : null}
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row" style={{marginBottom: '12px'}}>
              <div className="col-sm-6">
                <SelectBase data={templatesData} onSelect={this.onSelect} defaultSelect/>
              </div>
              <div className="col-sm-4">
                <label htmlFor="bgLoader" className="btn btn-primary" style={{marginTop: '4px'}}>
                  <span className="glyphicon glyphicon-upload" aria-hidden="true" style={{marginRight: '4px'}}/>
                  上传合同
                  <input id="bgLoader" type="file" name="bgLoader" onChange={event => onBgFileChange(event.target.files[0])}/>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <button type="button" className="btn btn-primary" onClick={this.addIText}>
                  <span className="glyphicon glyphicon-plus" aria-hidden="true" style={{marginRight: '4px'}}/>添加文本
                </button>
              </div>
              <div className="col-sm-4">
                <label htmlFor="imageLoader" className="btn btn-primary">
                  <span className="glyphicon glyphicon-upload" aria-hidden="true" style={{marginRight: '4px'}}/>
                  上传公章
                </label>
                <input id="imageLoader" type="file" name="imageLoader" onChange={this.onFileChange}/>
              </div>
              <div className="col-sm-4">
                <div ref="color_picker_wrapper"></div>
              </div>
            </div>
          </div>
          <div className="panel-body">
            {data.map(iTextInstance =>
              <div className="row" key={iTextInstance.id}>
                <div className="col-sm-12">
                  <div className="Form-item-base">
                    <input
                      type="text" value={iTextInstance.text}
                      onFocus={event => {onActive(iTextInstance.id, event)}}
                      onChange={event => {this.onChange(iTextInstance, event.target.value)}}
                    />
                    <span><a onClick={event => this.deleteIText(iTextInstance.id, event)}>删除</a></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="panel-footer"><button className="btn btn-primary" onClick={this.onSave}>保存图片</button></div>
        </div>
      </div>
    </div>);
  }
});

module.exports = OperationMain;
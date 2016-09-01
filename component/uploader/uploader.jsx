var React = require('react');
var ReactDOM = require('react-dom');
var classnams = require('classnames');
var Progress = require('../progress/progress');
var ReactTooltip = require('react-tooltip');
var _ = require('underscore');
require('./uploader.less');
const FileUpload = require('react-fileupload');
var STATUS = {
  STANDBY: 1, // 准备上传
  UPLOADING: 2, // 上传中
  SUCCESS: 3, // 上传成功
  FAILED: 4 // 上传失败
};
/**
 * @desc [文件上传基础组件]
 * @author 【niekai】
 * @date [2016-08-22]
 */
var Uploader = React.createClass({
  propTypes: {
    uploadUrl: React.PropTypes.string.isRequired,
    btnText: React.PropTypes.string,
    onFileUploaded: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      data: {
        name: '',// 文件名称
        url: '' // 文件url
      },
    }
  },
  getInitialState() {
    var that = this;
    this.options = {
      baseUrl: this.props.uploadUrl,
      dataType: 'json',
      chooseAndUpload: true,
      fileFieldName: 'uploadFile[]',
      // param:{
      //   fid:0
      // },
      accept: 'jpg',
      chooseFile() {
        console.info('chooseFile');
        that.setState({
          status: STATUS.UPLOADING,
        });
      },
      uploading(progress) {
        console.info('progress' + progress);
        that.setState({
          percent: progress.loaded / progress.total * 100
        });
      },
      uploadSuccess(resp) {
        console.log('upload success..!');
        var { onFileUploaded } = that.props;
        // Called when file has finished uploading
        if (onFileUploaded) onFileUploaded(resp.body.data);
        window.setTimeout(event => {
          that.setState({
            status: STATUS.SUCCESS,
          });
        }, 1000)
      },
      uploadError : function(err) {
        alert(err.message);
        that.setState({
          status: STATUS.FAILED,
          msg: err.message
        });
        window.setTimeout(event => {
          that.setState({
            status: STATUS.STANDBY,
          });
        }, 2500);
      }
    };
    // 返回初始state
    return {
      status: STATUS.STANDBY,
      percent: 0,
    };
  },
  componentDidMount() {
  },
  componentWillUnmount() {
  },
  getInfoViewRender() {
    var { percent, status, msg } = this.state;
    var { btnText, data } = this.props;
    var id = _.uniqueId('tips-');
    return (<div  className="plupload-file-info-wrapper">
      { status == STATUS.SUCCESS ? <span className="glyphicon glyphicon-ok" /> : null}
      { status == STATUS.FAILED ? <div className="row-file"><span className="glyphicon glyphicon-remove" ></span>{msg}</div> : null}
      <a data-tip data-for={id} href={data.url} target="_blank" className={classnams({hide: status == STATUS.FAILED })}>{data.name}</a>
      <ReactTooltip id={id} type="light" effect="solid" offset={{left: -20}} border={true}>
        <div style={{
          width: '100px', height: '100px', backgroundImage: 'url(' + data.url + ')', backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat', backgroundPosition: '50% 50%'
        }} />
      </ReactTooltip>
      <div className="plupload-progress-holder">
        {percent > 0 && status == STATUS.UPLOADING ? <Progress data={percent} /> : null}
      </div>
    </div>);
  },
  render() {
    var { btnText } = this.props;
    return (
      <div style={{position: 'relative'}}>
        <FileUpload options={this.options}>
          <button ref="chooseAndUpload" type="button" className="btn btn-primary">
            <span className="glyphicon glyphicon-folder-open" style={{marginRight: '4px'}}/>
            { btnText ? btnText : '上传' }
          </button>
          {this.getInfoViewRender()}
        </FileUpload>
      </div>
    );
  }
});

module.exports = Uploader;
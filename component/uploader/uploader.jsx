var React = require('react');
var Progress = require('../progress/progress');
var ReactTooltip = require('react-tooltip');
require('./uploader.less');
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
        name: '',
        url: ''
      },
    }
  },
  getInitialState() {
    return {
      status: STATUS.STANDBY,
      percent: 0,
    };
  },
  componentDidMount() {
    var { uploadUrl, onFileUploaded } = this.props;
    var that = this;
    var uploader = new plupload.Uploader({
      runtimes : 'html5,flash,silverlight,html4',
      browse_button : this.refs.pickfiles, // you can pass in id...
      container: this.refs.pluploadWrapper, // ... or DOM Element itself
      url : uploadUrl,
      filters : {
        max_file_size : '10mb',
        mime_types: [
          {title : "Image files", extensions : "jpg,gif,png"},
          {title : "Zip files", extensions : "zip"}
        ]
      },
      // Flash settings
      flash_swf_url : '/assets/plupload/Moxie.swf',
      // Silverlight settings
      silverlight_xap_url : '/assets/plupload/Moxie.xap',
      init: {
        PostInit: function() {
        },
        FilesAdded: function(up, files) {
          plupload.each(files, function(file) {
            //document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
          });
          this.start();
          that.setState({
            status: STATUS.UPLOADING,
          });
        },
        UploadProgress: function(up, file) {
          //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
          that.setState({
            percent: file.percent
          });
        },
        FileUploaded: function(up, file, res) {
          var { onFileUploaded } = that.props;
          // Called when file has finished uploading
          if (onFileUploaded) onFileUploaded({
            name: file.name,
            url: res.response
          });
          window.setTimeout(event => {
            that.setState({
              status: STATUS.SUCCESS,
            });
          }, 1000)
        },
        Error: function(up, err) {
          that.setState({
            status: STATUS.FAILED,
            msg: err.message
          });
          //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
        }
      }
    });

    uploader.init();
    this.uploader = uploader;
  },
  onSelectFile() {
    this.uploader.start();
  },
  getInfoViewRender() {
    var { percent, status, msg } = this.state;
    var { btnText, data } = this.props;
    return (<div  className="plupload-file-info-wrapper">
      { status == STATUS.SUCCESS ? <span className="glyphicon glyphicon-ok" /> : null}
      { status == STATUS.FAILED ? <div className="row-file"><span className="glyphicon glyphicon-remove" ></span>{msg}</div> : null}
      { status != STATUS.FAILED ? <a data-tip data-for="sadFace" href={data.url} target="_blank">{data.name}</a> : null}
      <ReactTooltip id="sadFace" type="light" effect="solid" offset={{left: -20}} border={true}>
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
    return (<div>
      <div ref="pluploadWrapper">
        <button ref="pickfiles" type="button" className="btn btn-primary">
          <span className="glyphicon glyphicon-folder-open" aria-hidden="true" style={{marginRight: '4px'}}/>
          { btnText ? btnText : '上传底图' }
        </button>
        {this.getInfoViewRender()}
      </div>
    </div>);
  }
});

module.exports = Uploader;
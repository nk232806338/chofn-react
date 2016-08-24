var React = require('react');
var FileUpload = require('react-fileupload');


var Uploader = React.createClass({

  render() {
    return (
      <div>
        <FileUpload options={{
          baseUrl:'http://127.0.0.1',
          param:{
            fid:0
          }
        }}>
          <button ref="chooseBtn">choose</button>
          <button ref="uploadBtn">upload</button>
        </FileUpload>
      </div>
    );
  }
});

module.exports = Uploader;
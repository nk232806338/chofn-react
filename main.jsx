var React = require('react');
var ReactDOM = require('react-dom');
var Contract = require('./component/app/contract/contract-main');
const FileUpload = require('react-fileupload');
var App = React.createClass({
  render() {
    var options= {
      baseUrl:'/upload',
      param:{
        fid:0
      },
      chooseFile() {
        console.info('1');
      }
    }
    ;
    return (
      <div>
        <Contract />
        <FileUpload options={options}>
          <button ref="chooseBtn">choose</button>
          <button ref="uploadBtn">upload</button>
        </FileUpload>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-container'));




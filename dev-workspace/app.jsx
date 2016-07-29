var React = require('react');
var ReactDOM = require('react-dom');
var Operation = require('./opeartion/operation-main');
var _ = require('underscore');
var loading = require('./assets/loading.gif');
var defaultFontColor = '#5E5E58';
var TextNodeArray = [
  {id: 1, text: '标题1', color: defaultFontColor, fontFamily: '', index: 0},
  {id: 2, text: '标题2', color: defaultFontColor, fontFamily: '', index: 1},
  {id: 3, text: '标题3', color: defaultFontColor, fontFamily: '', index: 2}
];

var TemplatesData = [
  {id: 1, name: '模板1', url: './demo-imgs/PA1601635CD.jpg'},
  {id: 2, name: '模板2', url: './demo-imgs/PA1601647CD.jpg'},
  {id: 3, name: '模板3', url: './demo-imgs/PB1509519TJ.png'},
  {id: 4, name: '模板4', url: './demo-imgs/PB1601659BJ.jpg'},
];

var TextConfig = {
  left: 100,
  fontFamily: 'SimSun',
  fill: defaultFontColor,
  fontWeight: '100',
  fontSize: parseInt('24'),
  editable: true,
  // textBackgroundColor: '#fff',
  lockUniScaling: true,
};

var canvas = new fabric.Canvas('imageCanvas',{backgroundColor: 'rgb(240,240,240)'});

var App = React.createClass({
  getInitialState() {
    this.deletedTextArray = [];
    return {
      data: TextNodeArray,
      isUploading: false,
      isGettingBg: true
    };
  },
  setBg(templateData) {
    if (this.currentBgImgInstance) {
      canvas.clear();
      canvas.renderAll();
      this.currentBgImgInstance = null;
    }
    this.setState({
      isGettingBg: true
    });
    var that = this;
    var bgImg = new Image();
    bgImg.onload = function () {
      var bgImgInstance = new fabric.Image(bgImg, {
        selectable: false,
      });
      bgImgInstance.scaleToWidth(1000);
      canvas.add(bgImgInstance);
      canvas.moveTo(bgImgInstance, 0);
      that.currentBgImgInstance = bgImgInstance;
      _.each(TextNodeArray, (textNode, index) => {
        textNode.iTextInstance =  new fabric.Text(textNode.text, _.extend(TextConfig, {
          top: index * 24,
        }));
        canvas.add(textNode.iTextInstance);
        canvas.moveTo(textNode.iTextInstance, 1);
      });
      that.setState({
        isGettingBg: false
      });
    };
    bgImg.src = templateData.url;
  },
  componentDidMount() {
    this.setBg(TemplatesData[0]);
  },
  onChange(TextNodeArray) {
    _.each(TextNodeArray, textNode => {
      textNode.iTextInstance.set({
        text: textNode.text
      });
    });
    canvas.renderAll();
  },
  onColorChange(value) {
    var { data } = this.state;
    _.each(data, textNode => {
      textNode.iTextInstance.setColor('#' + value);
    });
    canvas.renderAll();
  },
  onFileChange(file) {
    var reader = new FileReader();
    reader.onload = function(event){
      var img = new Image();
      img.width = 200;
      img.height = 200;
      img.onload = function(){
        var imgInstance = new fabric.Image(img);
        canvas.add(imgInstance);
        canvas.moveTo(imgInstance, 100);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  },
  onBgFileChange(file) {
    var that = this;
    var reader = new FileReader();
    if (this.currentBgImgInstance) {
      canvas.remove(this.currentBgImgInstance);
      canvas.renderAll();
      this.currentBgImgInstance = null;
    }
    reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
        var bgImgInstance = new fabric.Image(img, {
          selectable: false
        });
        bgImgInstance.scaleToWidth(1000);
        canvas.add(bgImgInstance);
        canvas.moveTo(bgImgInstance, 0);
        that.currentBgImgInstance = bgImgInstance;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  },
  addIText() {
    var { data } = this.state;
    var index = data.length;
    if (this.deletedTextArray.length > 0) {
      index = this.deletedTextArray.pop();
    }
    var textNode = {
      id: new Date().getTime(),
      text: '默认标题',
      color: defaultFontColor,
      fontFamily: '',
      index: index,
      padding: 10,
    };
    data.push(textNode);
    textNode.iTextInstance = new fabric.Text(textNode.text, _.extend(TextConfig, {
      top: index * 24,
    }));
    this.setState({
      data
    });
    canvas.add(textNode.iTextInstance);
    canvas.moveTo(textNode.iTextInstance, 1);
    canvas.renderAll();
  },
  deleteIText(textNodeId) {
    var { data } = this.state;
    var willDeleteTextNode = _.find(data, {id: textNodeId});
    this.setState({
      data: _.filter(data, textNode => {
        return textNode.id != textNodeId;
      })
    });
    this.deletedTextArray.push(willDeleteTextNode.index);
    canvas.remove(willDeleteTextNode.iTextInstance);
    canvas.renderAll();
  },
  onActive(textNodeId) {
    var { data } = this.state;
    var willActiveTextNode = _.find(data, {id: textNodeId});
    canvas.setActiveObject(willActiveTextNode.iTextInstance);
  },
  onSave() {
    var base64Url = canvas.toDataURL({
      format: 'jpeg',
      quality: 0.8
    });
    this.setState({
      isUploading: true
    });
    window.setTimeout(() => {
      this.setState({
        isUploading: false
      });
    }, 2000);
  },
  onPrev() {
    canvas.deactivateAll().renderAll();
    var base64Url = canvas.toDataURL({
      format: 'jpeg',
      quality: 1
    });
    window.open(base64Url, '预览');
  },
  onChangeTemplate(templateData) {
    this.setBg(templateData);
  },
  render() {
    var { data, isUploading, isGettingBg} = this.state;
    return (<div>
      {isGettingBg ? <div className="loading-bg">
        <div className="tips">正在加载合同...<img src={loading} /></div>
      </div> : null}
      <Operation
        isUploading={isUploading} templatesData={TemplatesData} onSelect={this.onChangeTemplate}
        data={data} onActive={this.onActive} defaultFontColor={defaultFontColor}
        addIText={this.addIText} deleteIText={this.deleteIText}
        onChange={this.onChange} onSave={this.onSave} onPrev={this.onPrev}
        onColorChange={this.onColorChange} onFileChange={this.onFileChange} onBgFileChange={this.onBgFileChange}
      />
    </div>);
  }
});

ReactDOM.render(<App/>, document.getElementById('react-container'));







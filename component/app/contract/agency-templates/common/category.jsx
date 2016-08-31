var React = require('react');
var classnames = require('classnames');
/**
 * @desc [
 *  方案类型选择Component
 *  交互行为:
 *   a.有3个选择条件,形式为checkbox,分别为 "有方案", "有交底", "有图"
 *   b."有方案"在选中条件下,后续checkbox才可编辑
 *   c."有方案"在取消后,后续checkbox均需取消选中状态
 *   (d."有交底"若为选中状态,需要显示对应的文件上传组件,外层控制)
 * ]
 */
var Category = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
  },
  hasProjectChange(event) {
    var { data } = this.props;
    data.hasProject = event.target.checked ? 1 : 0;
    if (!data.hasProject) {
      data.hasClarificaitonbook = 0;
      data.hasPicture = 0;
    }
    this.onChange(data);
  },
  hasClarificaitonbookChange(event) {
    var { data } = this.props;
    data.hasClarificaitonbook = event.target.checked ? 1 : 0;
    this.onChange(data);
  },
  hasPictureChange(event) {
    var { data } = this.props;
    data.hasPicture = event.target.checked ? 1 : 0;
    this.onChange(data);
  },
  onChange(data) {
    var { onChange } = this.props;
    if (!data.hasOwnProperty('hasPicture')) {
      data.hasPicture = 0;
    }
    if (!data.hasOwnProperty('hasProject')) {
      data.hasProject = 0;
    }
    if (!data.hasOwnProperty('hasClarificaitonbook')) {
      data.hasClarificaitonbook = 0;
    }
    onChange(data);
  },
  render() {
    var { data } = this.props;
    return (
      <div>
        <label htmlFor="hasProject">
          <input
            defaultChecked={data.hasProjectChange}
            type="checkbox" name="hasProject"
            id="hasProject" onChange={this.hasProjectChange}
          />
          有方案
        </label>
        <label htmlFor="hasClarificaitonbook" className={classnames({disabled: !data.hasProject})}>
          <input
            defaultChecked={data.hasClarificaitonbook}
            type="checkbox" name="hasClarificaitonbook"
            id="hasClarificaitonbook" disabled={ !data.hasProject ? "disabled" : ""}
            onChange={this.hasClarificaitonbookChange}
          />
          有交底
        </label>
        <label htmlFor="hasPicture" className={classnames({disabled: !data.hasProject})}>
          <input
            defaultChecked={data.hasPicture}
            type="checkbox" name="hasPicture" id="hasPicture"
            disabled={ !data.hasProject ? "disabled" : ""}
            onChange={this.hasPictureChange}
          />
          有图
        </label>
      </div>
    );
  }
});

module.exports = Category;
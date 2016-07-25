var React = require('react');
var _ = require('underscore');
var SelectBase = require('../../../select/select-base.jsx');
var templateTypeData = require('../data/meta-data-5-template-type.json').body.data.COMMITMENT;
var Template1 = require('./template1/template1-main');
var Template2 = require('./template2/template2-main');
require('./price-calculater.less');
var Registry = {
  '1': Template1,
  '2': Template2,
};

var PriceCalculater = React.createClass({
  getInitialState() {
    return {
      templatesInstanceArray: [{id:1, showExpand: false}]
    };
  },
  addTemplate(templateInstance, event) {
    event.stopPropagation();
    this.state.templatesInstanceArray.push({id: _.uniqueId('template-id-')});
    this.setState({
      templatesInstanceArray: this.state.templatesInstanceArray
    });
  },
  removeTemplate(templateInstance, event) {
    event.stopPropagation();
    var { templatesInstanceArray } = this.state;
    this.setState({
      templatesInstanceArray : _.without(templatesInstanceArray, _.findWhere(templatesInstanceArray, {
        id: templateInstance.id
      }))
    });
  },
  onChangeTemplate(templateType, templateInstance) {
    var { templatesInstanceArray } = this.state;
    var currentTemplateInstance = _.find(templatesInstanceArray, {id: templateInstance.id});
    currentTemplateInstance.templateType = templateType.id;
    this.toggleExpand(templateInstance);
    this.setState({
      templatesInstanceArray
    });
  },
  toggleExpand(templateInstance) {
    if (!templateInstance.templateType) return false;
    var { templatesInstanceArray } = this.state;
    _.each(templatesInstanceArray, templateData => templateData.showExpand = false);
    var currentTemplateInstance = _.find(templatesInstanceArray, {id: templateInstance.id});
    currentTemplateInstance.showExpand = !currentTemplateInstance.showExpand;
    this.setState(templatesInstanceArray);
  },
  render() {
    var { templatesInstanceArray } = this.state;
    return (<div className="Price-calculater">
      {templatesInstanceArray.map(templateInstance => {
        var Component = Registry[templateInstance.templateType] || 'div';
        return (
          <div className="panel panel-default" key={templateInstance.id}>
            <div className="panel-heading" onClick={event => {this.toggleExpand(templateInstance, event)}}>
              <h3 className="panel-title">
                <div className="row">
                  <div className="col-sm-3">
                    <SelectBase data={_.map(templateTypeData, (value, key) => {
                        return {'id':key, 'value': value} }
                      )}
                    keyName="value" onSelect={templateType => this.onChangeTemplate(templateType, templateInstance)}
                    onClick={event => event.stopPropagation()}
                    />
                  </div>
                  <div className="col-sm-3">
                  </div>
                  <div className="col-sm-3">
                    <div style={{marginTop: '4px'}}/>
                    <button
                      type="button" className="btn btn-default" style={{marginRight: '6px'}}
                      onClick={event => this.addTemplate(templateInstance, event)}
                    >
                      <span className="glyphicon glyphicon-plus" aria-hidden="true" style={{marginRight: '4px'}}/>添加
                    </button>
                    <button type="button" className="btn btn-default" style={{marginRight: '6px'}}>
                      <span className="glyphicon glyphicon-duplicate" aria-hidden="true" style={{marginRight: '4px'}}/>复制
                    </button>
                    <button type="button" className="btn btn-default" onClick={event => {this.removeTemplate(templateInstance, event)}}>
                      <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{marginRight: '4px'}}/>删除
                    </button>
                  </div>
                  { templateInstance.templateType ? <div className="col-sm-3 toggle-switch-wrapper">
                    <i className="toggle-switcher">
                      { !templateInstance.showExpand ? <span className="glyphicon glyphicon-menu-down"><a></a></span> : <span className="glyphicon glyphicon-menu-up"><a></a></span>}
                    </i>
                  </div> : null}
                </div>

              </h3>
            </div>
            {templateInstance.showExpand ? <div className="panel-body">
              <Component />
            </div> : null}
          </div>
        )}
      )}
    </div>);
  }
});

module.exports = PriceCalculater;
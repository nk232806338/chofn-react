var React = require('react');
var _ = require('underscore');
var SelectBase = require('../../../select/select-base.jsx');
var templateTypeData = require('../data/meta-data-5-template-type.json').body.data.COMMITMENT;

var PriceCalculater = React.createClass({

  getInitialState() {
    return {
      templatesInstanceArray: [{id:1}]
    };
  },

  addTemplate() {
    this.setState({
      templatesInstanceArray: this.state.templatesInstanceArray.push({id:2})
    });
  },

  render() {
    var { templatesInstanceArray } = this.state;
    debugger;
    return (<div>
      {templatesInstanceArray.map(templateInstance => <div className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">
              <div className="row">
                <div className="col-sm-3">
                  <SelectBase data={_.map(templateTypeData, (value, key) => {
                      return {'id':key, 'value': value} }
                  )} keyName="value"/>
                </div>
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                  <div style={{marginTop: '4px'}}/>
                  <button
                    type="button" className="btn btn-default" style={{marginRight: '6px'}}
                    onClick={this.addTemplate}
                  >
                    <span className="glyphicon glyphicon-plus" aria-hidden="true" style={{marginRight: '4px'}}/>添加
                  </button>
                  <button type="button" className="btn btn-default" style={{marginRight: '6px'}}>
                    <span className="glyphicon glyphicon-duplicate" aria-hidden="true" style={{marginRight: '4px'}}/>复制
                  </button>
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{marginRight: '4px'}}/>删除
                  </button>
                </div>
              </div>

            </h3>
          </div>
          <div className="panel-body">
            <ul className="nav nav-tabs nav-justified">
              <li role="presentation" className="active"><a href="#">基本信息</a></li>
              <li role="presentation"><a href="#">费用信息</a></li>
              <li role="presentation"><a href="#">申请人信息</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>);
  }
});

module.exports = PriceCalculater;
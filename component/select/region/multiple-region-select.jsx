var React = require('react');
require('./multiple-region-select.less');
var Select = require('react-select');
var FormsyItem = require('../../form/Form-item-base');

var MultipleRegionSelect = React.createClass({
  render() {
    return (<div className="Multiple-region-select">
      <div className="row">
        <div className="col-sm-3">
          <Select></Select>
        </div>
        <div className="col-sm-3">
          <Select></Select>
        </div>
        <div className="col-sm-3">
          <Select></Select>
        </div>
        <div className="col-sm-3">
          <FormsyItem name="aaa" />
        </div>
      </div>
    </div>);
  }
});
module.exports = MultipleRegionSelect;
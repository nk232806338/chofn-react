var React = require('react');
require('./multiple-region-select.less');
var Select = require('react-select');
var axios = require('axios');
var API = require('../../api');
var FormsyItem = require('../../form/Form-item-base');

var MultipleRegionSelect = React.createClass({
  propTypes: {
    countryId: React.PropTypes.any,
    provinceId: React.PropTypes.any,
    cityId: React.PropTypes.any,
    areaId: React.PropTypes.any,
    address: React.PropTypes.any
  },
  componentDidMount() {

  },
  getProvince() {
    var { countryId } = this.props;
    return axios.post(API.getRegion, 'parentId=' + countryId, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => {
      return {
        options: response.data.body.data,
      };
    });
  },
  getCity() {
    var { provinceId } = this.props;
    return axios.post(API.getRegion, 'parentId=' + provinceId, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => {
      return {
        options: response.data.body.data,
      };
    });
  },
  getArea() {
    var { cityId } = this.props;
    return axios.post(API.getRegion, 'parentId=' + cityId, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => {
      return {
        options: response.data.body.data,
      };
    });
  },
  render() {
    var { countryId, provinceId, cityId, areaId } = this.props;
    return (<div className="Multiple-region-select">
      <div className="row">
        <div className="col-sm-3">
          <Select.Async
            value={provinceId} clearable={false}
            valueKey="id" labelKey="name" loadOptions={this.getProvince}
          />
        </div>
        <div className="col-sm-3">
          <Select.Async
            value={cityId} clearable={false}
            valueKey="id" labelKey="name" loadOptions={this.getCity}
          />
        </div>
        <div className="col-sm-3">
          <Select.Async
            value={areaId} clearable={false}
            valueKey="id" labelKey="name" loadOptions={this.getArea}
          />
        </div>
        <div className="col-sm-3">
          <FormsyItem name="aaa" />
        </div>
      </div>
    </div>);
  }
});
module.exports = MultipleRegionSelect;
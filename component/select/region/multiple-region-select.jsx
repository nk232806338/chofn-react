var React = require('react');
require('./multiple-region-select.less');
var Select = require('react-select');
var axios = require('axios');
var API = require('../../api');
var FormsyItem = require('../../form/Form-item-base');
/**
 * @type {__React.ClassicComponentClass<P>}
 * @desc 省/市/区 三级联动下拉框
 */
var MultipleRegionSelect = React.createClass({
  propTypes: {
    countryId: React.PropTypes.any,
    provinceId: React.PropTypes.any,
    cityId: React.PropTypes.any,
    areaId: React.PropTypes.any,
    address: React.PropTypes.any,
    onChange: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      countryId: 1
    }
  },
  getInitialState() {
    var { provinceId, cityId, areaId } = this.props;
    this.data = {
      provinceId: provinceId,
      cityId: cityId,
      areaId: areaId,
    };
    return {
      provinceArray: [],
      cityArray: [],
      areaArray: [],
    };
  },
  componentDidMount() {
    this.getProvince();
    this.getCity();
    this.getArea();
  },
  componentWillUpdate(nextProps, nextState) {
    if (this.props.provinceId != nextProps.provinceId) {
      this.getCity(nextProps.provinceId);
    }
    if (this.props.cityId != nextProps.cityId) {
      this.getArea(nextProps.cityId);
    }
    if (this.props.areaId != nextProps.areaId) {

    }
  },
  getProvince() {
    var { countryId } = this.props;
    return axios.post(API.getRegion, 'parentId=' + countryId, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => {
      this.setState({
        provinceArray: response.data.body.data
      });
    });
  },
  getCity(provinceIdParam) {
    var { provinceId } = this.props;
    if (provinceIdParam) {
      provinceId = provinceIdParam;
    }
    return axios.post(API.getRegion, 'parentId=' + provinceId, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => {
      this.setState({
        cityArray: response.data.body.data
      });
    });
  },
  getArea(cityIdParam) {
    var { cityId } = this.props;
    if (cityIdParam) {
      cityId = cityIdParam;
    }
    return axios.post(API.getRegion, 'parentId=' + cityId, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(response => {
      this.setState({
        areaArray: response.data.body.data
      });
    });
  },
  onChange(newValue, type) {
    this.data[type] = newValue.id;
    switch (type) {
      case 'provinceId':
        this.data['cityId'] = undefined;
        this.data['areaId'] = undefined;
        break;
      case 'cityId':
        this.data['areaId'] = undefined;
        break;
    }
    this.props.onChange(this.data);
  },
  render() {
    var { provinceId, cityId, areaId } = this.props;
    var { provinceArray, cityArray, areaArray } = this.state;
    return (<div className="Multiple-region-select">
      <div className="row">
        <div className="col-sm-3">
          <Select
            value={provinceId} clearable={false}
            onChange={newValue => this.onChange(newValue, 'provinceId')}
            valueKey="id" labelKey="name" options={provinceArray}
          />
        </div>
        <div className="col-sm-3">
          <Select
            value={cityId} clearable={false}
            onChange={newValue => this.onChange(newValue, 'cityId')}
            valueKey="id" labelKey="name" options={cityArray}
          />
        </div>
        {areaArray.length > 0 ? <div className="col-sm-3">
          <Select
            value={areaId} clearable={false}
            onChange={newValue => this.onChange(newValue, 'areaId')}
            valueKey="id" labelKey="name" options={areaArray}
          />
        </div> : null}
        <div className="col-sm-3">
          <FormsyItem name="aaa" />
        </div>
      </div>
    </div>);
  }
});
module.exports = MultipleRegionSelect;
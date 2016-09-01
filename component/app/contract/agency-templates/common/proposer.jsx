var React = require('react');
var Formsy = require('formsy-react');
var Select = require('react-select');
var FormSelect = require('../../../../select/form-item-select');
var FormsyItem = require('../../../../form/Form-item-base');
var Uploader = require('../../../../uploader/uploader');
var MultipleRegionSelect = require('../../../../select/region/multiple-region-select');

/**
 * @type {__React.ClassicComponentClass<P>}
 * @desc 申请人信息组件
 */
var Proposer = React.createClass({
  propTypes: {
    data: React.PropTypes.any,
    proposersArrayMeta: React.PropTypes.array,
  },
  render() {
    var { data, proposersArrayMeta } = this.props;
    return (<Formsy.Form onSubmit={this.submit} ref="form" className="person-info-form">
      <div className="row">
        <div className="col-sm-12">
          <div className="Form-item clearfix">
            <label>申请人名称</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>证件号</label>
            <FormsyItem name="proposerCardNo" required tips="证件号" value={data.proposerCardNo}/>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>名称(英文)</label>
            <FormsyItem name="proposerEnName" required tips="名称(英文)" value={data.proposerEnName} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>国籍</label>
            <FormsyItem name="pwd" required tips="证件号" >
              <Select></Select>
            </FormsyItem>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>邮政编码</label>
            <FormsyItem name="pwd" required tips="邮政编码" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="Form-item clearfix" style={{width: '800px'}}>
            <label>申请人地址</label>
            <FormsyItem name="pwd" required tips="地址" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="Form-item clearfix">
            <label>地址</label>
            <div className="Form-item-base">
              <MultipleRegionSelect
                countryId={data.proposerCountryId}
                provinceId={data.proposerProvinceId}
                cityId={data.proposerCityId}
                areaId={data.proposerAreaId}
                address={data.proposerAddress}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>公章/签名</label>
            <div className="Form-item-base">
              <Uploader
                uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                btnText="" data={''}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>营业,个体户/执照</label>
            <div className="Form-item-base">
              <Uploader
                uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                btnText="" data={''}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>执照/护照翻译件</label>
            <div className="Form-item-base">
              <Uploader
                uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                btnText="" data={''}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="Form-item clearfix">
            <label>身份证(正,反)/护照</label>
            <div className="Form-item-base">
              <Uploader
                uploadUrl="/upload/" onFileUploaded={this.onFileUploaded}
                btnText="" data={''}
              />
            </div>
          </div>
        </div>
      </div>
    </Formsy.Form>);
  }
});

module.exports = Proposer;
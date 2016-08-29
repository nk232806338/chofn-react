var React = require('react');
var TableBase = require('../../table/table-base');
var axios = require('axios');
var API = require('../../api');
var Customers = React.createClass({
  propTypes: {
    data: React.PropTypes.any,
    onSelect: React.PropTypes.func
  },
  getInitialState() {
    return {
      data: []
    };
  },
  submit() {
    var { onSelect } = this.props;
    if (onSelect) onSelect(this.selectItem);
  },
  onSelect(item) {
    this.selectItem = item;
  },
  componentDidMount() {
    axios.post(API.getCustomers, '/page=1&pageSize=15', {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(response => {
      this.setState({
        data: response.data.body.data.rows
      });
    });
  },
  render() {
    var { data } = this.state;
    return (<div>
      <TableBase hasIndex data={data} onSelect={this.onSelect}>
        <TableBase.Column header={{cell: '', name: '客户名义'}} td={{cell: '', key: 'name'}} onEvents={this.onTableEvents} />
        <TableBase.Column header={{cell: '', name: '客户英文名称'}} td={{cell: '', key: 'name_en'}} onEvents={this.onTableEvents} />
        <TableBase.Column header={{cell: '', name: '客户地址'}} td={{cell: '', key: 'address'}} onEvents={this.onTableEvents} />
        <TableBase.Column header={{cell: '', name: '客户地址（英文）'}} td={{cell: '', key: 'address_en'}} onEvents={this.onTableEvents} />
        <TableBase.Column header={{cell: '', name: '所属顾问'}} td={{cell: '', key: 'consultantName'}} onEvents={this.onTableEvents} />
      </TableBase>
      <div style={{textAlign: 'center'}}>
        <button type="button" className="btn btn-primary" onClick={this.submit} style={{width: '100px'}}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true" style={{marginRight: '4px'}}/>确认
        </button>
      </div>

    </div>);
  }
});

module.exports = Customers;
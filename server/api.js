var _ = require('underscore');
var host = 'http://patent.test.chofn.net/';

var API = {
  'getRegion': 'Region/index/', // 获取所有国家
  'getPatentType': 'Metadata/get/?mIds=12&excludeAll=1', // 发明 实用新型 外观设计 集成电路布图设计
  'getRate': 'Metadata/get/?mIds=14&excludeAll=1', // 获取费率信息
  'getCommitment': 'Metadata/get/?mIds=8&serviceCate=1', // 合同类型: 1打2, 国内专利发明申请, 国外实用新型申请.....
  'getInventorPapersCate': 'Metadata/get/?mIds=15&excludeAll=1', // 证件类型
  'getCustomers': 'customer/index', // 分页获取客户列表
  'getProposers': 'Customer/proposerIndex', // '获取客户下的多个委托人信息'
};

var prefixHostAPI = {};
_.map(API, (key, value) => {
  prefixHostAPI[key] = host + value;
});

module.exports = prefixHostAPI;
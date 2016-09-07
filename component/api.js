var host = 'http://patent.test.chofn.net/';

var API = {
  'getRegion': host + 'Region/index/', // 获取所有国家
  'getPatentType': host + 'Metadata/get/?mIds=12&excludeAll=1', // 发明 实用新型 外观设计 集成电路布图设计
  'getRate': host + 'Metadata/get/?mIds=14&excludeAll=1', // 获取费率信息
  'getCommitment': host + 'Metadata/get/?mIds=8&serviceCate=1', // 合同类型: 1打2, 国内专利发明申请, 国外实用新型申请.....
  'getInventorPapersCate': host + 'Metadata/get/?mIds=15&excludeAll=1', // 证件类型
  'getCustomers': host + 'customer/index', // 分页获取客户列表
  'getProposers': host + 'Customer/proposerIndex', // '获取客户下的多个申请人信息'
  'getBailors': host + 'Customer/bailorIndex/', // '获取客户下的多个委托人信息'
  'getContacts': host + 'Customer/contactIndex/', // '获取客户下的多个联系人信息'
  'uploadFile': host + 'File/upload/', // 文件上传接口
  'uploadMultipleFile': host + 'file/uploadmany/', // 多文件上传
  'getContractDetail': host + 'Contract/detail',
  'test': host + 'contract/itemDetail/?id=0', //获取合同测试数据
};

module.exports = API;
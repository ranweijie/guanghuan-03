'use strict';

const FinanceUsage = require('entity/new/finance_usage');

const FinanceUsageList = {_items: [FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, FinanceUsage, Object.assign({}, FinanceUsage, { usage: '车费', has_invoice: false })]}

module.exports = function(req, res, next) {

  res.send(FinanceUsageList);
  next();
};

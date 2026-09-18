/**
 * fraud/rules/index.js
 *
 * Central registry of every fraud rule. To add a new rule later:
 *   1. Create fraud/rules/yourRule.js exporting { ruleCode, enabled, evaluate }
 *   2. Require it below and add it to the exported array
 * No other file needs to change.
 */

const multipleAccount = require('./multipleAccount');
const sharedAddress = require('./sharedAddress');
const sharedPhone = require('./sharedPhone');
const sharedDevice = require('./sharedDevice');
const failedPayment = require('./failedPayment');
const highValue = require('./highValue');
const velocity = require('./velocity');
const newAccount = require('./newAccount');
const suspiciousIp = require('./suspiciousIp');

module.exports = [
  multipleAccount,
  sharedAddress,
  sharedPhone,
  sharedDevice,
  failedPayment,
  highValue,
  velocity,
  newAccount,
  suspiciousIp,
];

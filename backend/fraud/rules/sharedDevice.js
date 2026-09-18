/**
 * Rule: SHARED_DEVICE
 * Triggers when several accounts have placed orders from the same device.
 */

const config = require('../config');

const RULE_CODE = 'SHARED_DEVICE';

function evaluate(context) {
  const { minLinkedAccounts, points } = config.SHARED_DEVICE;
  const linkedAccounts = context.accountsSharingDevice || [];
  const triggered = linkedAccounts.length >= minLinkedAccounts;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `Device is linked to ${linkedAccounts.length + 1} accounts in total`
      : 'Device is not shared with other accounts',
    evidence: {
      linkedAccountCount: linkedAccounts.length + 1,
      threshold: minLinkedAccounts + 1,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

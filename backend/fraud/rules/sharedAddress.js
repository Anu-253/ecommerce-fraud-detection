/**
 * Rule: SHARED_ADDRESS
 * Triggers when several accounts are registered with the same address.
 */

const config = require('../config');

const RULE_CODE = 'SHARED_ADDRESS';

function evaluate(context) {
  const { minLinkedAccounts, points } = config.SHARED_ADDRESS;
  const linkedAccounts = context.accountsSharingAddress || [];
  const triggered = linkedAccounts.length >= minLinkedAccounts;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `Address is linked to ${linkedAccounts.length + 1} accounts in total`
      : 'Address is not shared with other accounts',
    evidence: {
      linkedAccountCount: linkedAccounts.length + 1,
      threshold: minLinkedAccounts + 1,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

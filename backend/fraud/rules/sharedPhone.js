/**
 * Rule: SHARED_PHONE
 * Triggers when several accounts are registered with the same phone number.
 */

const config = require('../config');

const RULE_CODE = 'SHARED_PHONE';

function evaluate(context) {
  const { minLinkedAccounts, points } = config.SHARED_PHONE;
  const linkedAccounts = context.accountsSharingPhone || [];
  const triggered = linkedAccounts.length >= minLinkedAccounts;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `Phone number is linked to ${linkedAccounts.length + 1} accounts in total`
      : 'Phone number is not shared with other accounts',
    evidence: {
      linkedAccountCount: linkedAccounts.length + 1,
      threshold: minLinkedAccounts + 1,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

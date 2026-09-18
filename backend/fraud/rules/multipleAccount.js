/**
 * Rule: MULTIPLE_ACCOUNT
 * Triggers when the same customer has registered more than one account.
 */

const config = require('../config');

const RULE_CODE = 'MULTIPLE_ACCOUNT';

function evaluate(context) {
  const { minLinkedAccounts, points } = config.MULTIPLE_ACCOUNT;
  const linkedAccounts = context.accountsForCustomer || [];
  const triggered = linkedAccounts.length >= minLinkedAccounts;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `Customer has ${linkedAccounts.length + 1} accounts registered in total`
      : 'Customer does not have multiple linked accounts',
    evidence: {
      linkedAccountCount: linkedAccounts.length + 1,
      threshold: minLinkedAccounts + 1,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

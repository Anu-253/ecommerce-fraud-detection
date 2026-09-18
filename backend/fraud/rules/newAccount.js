/**
 * Rule: NEW_ACCOUNT
 * Triggers when the account placing the order was created very recently.
 * Weak signal on its own — legitimate customers sign up and buy immediately
 * all the time — but meaningful when combined with other rules.
 */

const config = require('../config');

const RULE_CODE = 'NEW_ACCOUNT';

function evaluate(context) {
  const { maxAgeDays, points } = config.NEW_ACCOUNT;
  const ageDays = context.accountAgeDays;
  const triggered = ageDays < maxAgeDays;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `Account was created ${ageDays} day(s) ago (newer than the ${maxAgeDays}-day threshold)`
      : 'Account is not newly created',
    evidence: {
      accountAgeDays: ageDays,
      maxAgeDays,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

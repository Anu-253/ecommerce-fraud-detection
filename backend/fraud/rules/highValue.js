/**
 * Rule: HIGH_VALUE
 * Triggers when the order amount is unusually large.
 */

const config = require('../config');

const RULE_CODE = 'HIGH_VALUE';

function evaluate(context) {
  const { amountThreshold, points } = config.HIGH_VALUE;
  const amount = context.order.amount;
  const triggered = amount >= amountThreshold;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `Order amount ${amount} meets or exceeds the high-value threshold of ${amountThreshold}`
      : 'Order amount is within the normal range',
    evidence: {
      amount,
      amountThreshold,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

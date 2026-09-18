/**
 * Rule: VELOCITY
 * Triggers when an account places too many orders in a short window.
 */

const config = require('../config');

const RULE_CODE = 'VELOCITY';

function evaluate(context) {
  const { minTransactions, windowMinutes, points } = config.VELOCITY;
  const txnCount = context.transactionsLastHour || 0;
  const triggered = txnCount >= minTransactions;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `${txnCount} orders placed in the last ${windowMinutes} minutes`
      : 'Order frequency is within the normal range',
    evidence: {
      transactionCount: txnCount,
      windowMinutes,
      threshold: minTransactions,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

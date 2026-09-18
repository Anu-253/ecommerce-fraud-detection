/**
 * Rule: FAILED_PAYMENT
 * Triggers when an account has too many failed payment attempts
 * within a short time window (card testing / stolen-card behaviour).
 */

const config = require('../config');

const RULE_CODE = 'FAILED_PAYMENT';

function evaluate(context) {
  const { minAttempts, windowMinutes, points } = config.FAILED_PAYMENT;
  const failedCount = context.failedPaymentsLast10Min || 0;
  const triggered = failedCount >= minAttempts;

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason: triggered
      ? `${failedCount} failed payment attempts in the last ${windowMinutes} minutes`
      : 'No unusual failed payment activity',
    evidence: {
      failedAttempts: failedCount,
      windowMinutes,
      threshold: minAttempts,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

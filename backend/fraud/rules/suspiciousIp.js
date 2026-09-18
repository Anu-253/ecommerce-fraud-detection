/**
 * Rule: SUSPICIOUS_IP
 * Triggers when the order's IP address is on a known blocklist, OR
 * this account has never placed an order from this IP before.
 */

const config = require('../config');

const RULE_CODE = 'SUSPICIOUS_IP';

function evaluate(context) {
  const { points } = config.SUSPICIOUS_IP;
  const triggered = context.isBlacklistedIp || context.isUnfamiliarIp;

  let reason = 'IP address looks normal for this account';
  if (context.isBlacklistedIp) {
    reason = `IP ${context.order.ipAddress} is on the suspicious IP list`;
  } else if (context.isUnfamiliarIp) {
    reason = `IP ${context.order.ipAddress} has not been used by this account before`;
  }

  return {
    ruleCode: RULE_CODE,
    triggered,
    points: triggered ? points : 0,
    reason,
    evidence: {
      ipAddress: context.order.ipAddress,
      isBlacklisted: context.isBlacklistedIp,
      isUnfamiliar: context.isUnfamiliarIp,
    },
  };
}

module.exports = { ruleCode: RULE_CODE, enabled: true, evaluate };

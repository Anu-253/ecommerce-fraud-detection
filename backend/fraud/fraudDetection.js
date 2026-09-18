/**
 * fraud/fraudDetection.js
 *
 * The Fraud Detection Engine. This file does NOT talk to MongoDB —
 * it only works with the plain "context" object produced by
 * contextBuilder.js. That separation is what makes rules easy to
 * unit-test and easy to reason about in a viva.
 */

const rules = require('./rules');
const { calculateRiskScore } = require('./riskScoring');
const { decideAction } = require('./decisionEngine');

/**
 * Runs every enabled rule against the given context.
 * @param {Object} context - built by contextBuilder.buildTransactionContext()
 * @returns {Array} list of RuleResult objects for rules that triggered
 */
function runRules(context) {
  const triggeredRules = [];

  for (const rule of rules) {
    if (rule.enabled === false) continue; // allows disabling a rule without deleting it

    const result = rule.evaluate(context);

    if (result && result.triggered) {
      triggeredRules.push(result);
    }
  }

  return triggeredRules;
}

/**
 * The single entry point the rest of the app should call.
 * @param {Object} context - built by contextBuilder.buildTransactionContext()
 * @returns {{
 *   riskScore: number,
 *   riskLevel: 'LOW'|'MEDIUM'|'HIGH',
 *   decision: 'APPROVE'|'VERIFY'|'HOLD',
 *   triggeredRules: Array,
 *   reasons: string[]
 * }}
 */
function evaluateTransaction(context) {
  const triggeredRules = runRules(context);
  const { riskScore, riskLevel } = calculateRiskScore(triggeredRules);
  const decision = decideAction(riskLevel);
  const reasons = triggeredRules.map((rule) => rule.reason);

  return {
    riskScore,
    riskLevel,
    decision,
    triggeredRules,
    reasons,
  };
}

module.exports = { evaluateTransaction, runRules };

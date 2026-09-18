/**
 * fraud/riskScoring.js
 *
 * Turns a list of triggered rule results into a single 0-100 score
 * and a LOW / MEDIUM / HIGH risk level.
 */

const config = require('./config');

function calculateRiskScore(triggeredRules) {
  const rawScore = triggeredRules.reduce((sum, rule) => sum + (rule.points || 0), 0);
  const riskScore = Math.min(rawScore, 100);

  let riskLevel;
  if (riskScore <= config.RISK_LEVELS.LOW_MAX) {
    riskLevel = 'LOW';
  } else if (riskScore <= config.RISK_LEVELS.MEDIUM_MAX) {
    riskLevel = 'MEDIUM';
  } else {
    riskLevel = 'HIGH';
  }

  return { riskScore, riskLevel };
}

module.exports = { calculateRiskScore };

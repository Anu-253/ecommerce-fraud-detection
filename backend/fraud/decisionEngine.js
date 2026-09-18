/**
 * fraud/decisionEngine.js
 *
 * Maps a risk level to the action the system should take.
 * Kept as its own module so the mapping can change (or later depend on
 * more than just riskLevel) without touching the scoring logic.
 */

const DECISION_BY_LEVEL = {
  LOW: 'APPROVE',
  MEDIUM: 'VERIFY',
  HIGH: 'HOLD',
};

function decideAction(riskLevel) {
  return DECISION_BY_LEVEL[riskLevel] || 'VERIFY'; // fail safe: default to VERIFY, never silently approve
}

module.exports = { decideAction, DECISION_BY_LEVEL };

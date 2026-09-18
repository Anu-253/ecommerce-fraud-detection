const mongoose = require('mongoose');

// Mirrors the RuleResult shape returned by every rule in fraud/rules/
const triggeredRuleSchema = new mongoose.Schema(
  {
    ruleCode: String,
    points: Number,
    reason: String,
    evidence: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

/**
 * NEW MODEL — this is where every fraud decision is recorded so it can
 * always be explained later ("why was this order held?").
 */
const fraudAssessmentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    riskScore: { type: Number, required: true, min: 0, max: 100 },
    riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], required: true },
    decision: { type: String, enum: ['APPROVE', 'VERIFY', 'HOLD'], required: true },
    triggeredRules: [triggeredRuleSchema],
    reasons: [String],
  },
  { timestamps: true }
);

fraudAssessmentSchema.index({ order: 1 });
fraudAssessmentSchema.index({ riskLevel: 1 });
fraudAssessmentSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('FraudAssessment', fraudAssessmentSchema);

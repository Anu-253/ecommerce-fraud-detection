const mongoose = require('mongoose');

/**
 * NEW MODEL — created automatically whenever the fraud engine returns
 * decision: 'HOLD'. This is the queue your admin/fraud-analyst screen
 * would read from.
 */
const fraudCaseSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'FraudAssessment', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['OPEN', 'APPROVED', 'REJECTED', 'CONFIRMED_FRAUD', 'LEGITIMATE'],
      default: 'OPEN',
    },
    decisionNotes: { type: String, default: '' },
    resolvedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

fraudCaseSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('FraudCase', fraudCaseSchema);

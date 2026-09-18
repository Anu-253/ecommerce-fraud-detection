const mongoose = require('mongoose');

/**
 * NEW MODEL — the existing backend has no record of failed payment attempts
 * at all (checkoutroutes.js's /:id/pay just returns 400 and forgets about it).
 * This is required for the FAILED_PAYMENT fraud rule to have anything to count.
 *
 * Linked to Checkout (not Order) because in this codebase a payment is
 * attempted BEFORE an Order exists — the Order is only created later,
 * in the /:id/finalize step.
 */
const paymentAttemptSchema = new mongoose.Schema({
  checkoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Checkout' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['SUCCESS', 'FAILED'], required: true },
  failureReason: { type: String },
  attemptedAt: { type: Date, default: Date.now },
});

// Supports the FAILED_PAYMENT rule's "count failures in the last N minutes" query.
paymentAttemptSchema.index({ user: 1, attemptedAt: -1 });

module.exports = mongoose.model('PaymentAttempt', paymentAttemptSchema);

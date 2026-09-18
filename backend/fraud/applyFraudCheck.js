/**
 * fraud/applyFraudCheck.js
 *
 * The single integration point between the fraud module and order creation.
 * Both order-creation routes (POST /api/orders and POST /api/checkout/:id/finalize)
 * call this same function right after the Order document is saved, so the
 * logic only lives in one place.
 *
 * @param {Document} order - an already-saved Mongoose Order document.
 *                            Must have: _id, user, totalPrice, shippingAddress.
 *                            May have: ipAddress, deviceId (set by the caller
 *                            before this function runs).
 * @returns {Promise<Object>} the fraud result, ready to merge into the API response
 */

const FraudAssessment = require('../models/FraudAssessment');
const FraudCase = require('../models/FraudCase');
const { buildTransactionContext } = require('./contextBuilder');
const { evaluateTransaction } = require('./fraudDetection');

// VERIFY/HOLD get a new order status. APPROVE intentionally leaves the
// order's status untouched (it stays whatever it was created with, e.g. "Processing").
const ORDER_STATUS_BY_DECISION = {
  VERIFY: 'Verification Required',
  HOLD: 'On Hold',
};

async function applyFraudCheck(order) {
  const context = await buildTransactionContext({
    userId: order.user,
    amount: order.totalPrice,
    ipAddress: order.ipAddress,
    deviceId: order.deviceId,
    shippingAddress: order.shippingAddress,
  });

  const result = evaluateTransaction(context);

  const assessment = await FraudAssessment.create({
    order: order._id,
    user: order.user,
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    decision: result.decision,
    triggeredRules: result.triggeredRules,
    reasons: result.reasons,
  });

  const newStatus = ORDER_STATUS_BY_DECISION[result.decision];
  if (newStatus) {
    order.status = newStatus;
    await order.save();
  }

  let fraudCase = null;
  if (result.decision === 'HOLD') {
    fraudCase = await FraudCase.create({
      order: order._id,
      assessment: assessment._id,
      user: order.user,
      status: 'OPEN',
    });
  }

  return {
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    decision: result.decision,
    triggeredRules: result.triggeredRules,
    reasons: result.reasons,
    orderStatus: order.status,
    fraudCaseId: fraudCase ? fraudCase._id : null,
  };
}

module.exports = { applyFraudCheck };

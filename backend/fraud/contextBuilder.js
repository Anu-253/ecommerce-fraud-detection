/**
 * fraud/contextBuilder.js
 *
 * ADAPTED for the existing backend's schema (User + Order, no separate
 * Account/Customer models). This is the ONLY file that queries MongoDB
 * for fraud data — every rule file still just reads plain fields off
 * the returned "context" object, completely unchanged from the
 * original fraud module.
 */

const User = require('../models/User');
const Order = require('../models/order');
const PaymentAttempt = require('../models/PaymentAttempt');
const config = require('./config');

/**
 * Turns an order's shippingAddress sub-document into one comparable string.
 * Existing schema shape: { address, city, postalCode, country }
 */
function normalizeAddress(shippingAddress) {
  if (!shippingAddress) return null;
  const { address, city, postalCode, country } = shippingAddress;
  if (!address || !city || !postalCode) return null;
  return [address, city, postalCode, country]
    .filter(Boolean)
    .join('|')
    .toLowerCase()
    .trim();
}

/**
 * @param {Object} input
 * @param {String} input.userId          - the User placing the order
 * @param {Number} input.amount          - order amount (Order.totalPrice)
 * @param {String} [input.ipAddress]     - request IP (req.ip)
 * @param {String} [input.deviceId]      - optional device fingerprint from the client
 * @param {Object} [input.shippingAddress] - { address, city, postalCode, country }
 * @returns {Promise<Object>} transaction context consumed by fraud rules
 */
async function buildTransactionContext({ userId, amount, ipAddress, deviceId, shippingAddress }) {
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  const now = new Date();
  const failedPaymentWindowStart = new Date(
    now.getTime() - config.FAILED_PAYMENT.windowMinutes * 60 * 1000
  );
  const velocityWindowStart = new Date(
    now.getTime() - config.VELOCITY.windowMinutes * 60 * 1000
  );
  const normalizedAddress = normalizeAddress(shippingAddress);

  const [
    otherOrdersForAddressCheck,
    usersSharingPhone,
    ordersSharingDevice,
    failedPaymentsLast10Min,
    transactionsLastHour,
    priorOrdersFromThisIp,
  ] = await Promise.all([
    // Existing schema has no pre-computed "normalizedHash" field on Order,
    // so we pull other users' orders and compare addresses in JS.
    // Fine at student-project scale; note in README if the order volume grows.
    normalizedAddress
      ? Order.find({ user: { $ne: userId } }).select('user shippingAddress').lean()
      : Promise.resolve([]),

    user.phone
      ? User.find({ _id: { $ne: userId }, phone: user.phone }).select('_id').lean()
      : Promise.resolve([]),

    deviceId
      ? Order.find({ user: { $ne: userId }, deviceId }).select('user').lean()
      : Promise.resolve([]),

    PaymentAttempt.countDocuments({
      user: userId,
      status: 'FAILED',
      attemptedAt: { $gte: failedPaymentWindowStart },
    }),

    Order.countDocuments({
      user: userId,
      createdAt: { $gte: velocityWindowStart },
    }),

    ipAddress
      ? Order.countDocuments({ user: userId, ipAddress })
      : Promise.resolve(0),
  ]);

  // Distinct OTHER users whose order shipping address matches this one
  const accountsSharingAddress = normalizedAddress
    ? [
        ...new Set(
          otherOrdersForAddressCheck
            .filter((o) => normalizeAddress(o.shippingAddress) === normalizedAddress)
            .map((o) => String(o.user))
        ),
      ]
    : [];

  const accountsSharingPhone = usersSharingPhone.map((u) => String(u._id));

  const accountsSharingDevice = [...new Set(ordersSharingDevice.map((o) => String(o.user)))];

  // "Multiple accounts" is redefined here (no separate Customer entity exists
  // in this backend) as: the union of every OTHER user linked to this one
  // through ANY of address / phone / device. It catches identity clusters
  // that the three narrower rules above only see one signal at a time.
  const accountsForCustomer = [
    ...new Set([...accountsSharingAddress, ...accountsSharingPhone, ...accountsSharingDevice]),
  ];

  const accountAgeDays = Math.floor(
    (now.getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const isBlacklistedIp = !!ipAddress && config.SUSPICIOUS_IP.blacklist.includes(ipAddress);
  const isUnfamiliarIp = !!ipAddress && priorOrdersFromThisIp === 0;

  return {
    order: {
      userId: user._id,
      amount,
      ipAddress,
      deviceId,
    },
    account: user, // kept for reference/debugging; no rule reads this directly
    accountsSharingAddress,
    accountsSharingPhone,
    accountsSharingDevice,
    accountsForCustomer,
    failedPaymentsLast10Min,
    transactionsLastHour,
    accountAgeDays,
    isNewAccount: accountAgeDays < config.NEW_ACCOUNT.maxAgeDays,
    isBlacklistedIp,
    isUnfamiliarIp,
  };
}

module.exports = { buildTransactionContext };

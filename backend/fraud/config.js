/**
 * fraud/config.js
 *
 * Single source of truth for every rule's points and thresholds.
 * Keeping these here (instead of hardcoding numbers inside each rule file)
 * means we can tune the fraud engine without touching rule logic.
 */

module.exports = {
  MULTIPLE_ACCOUNT: {
    // Triggers when the customer has this many OTHER accounts besides the current one
    minLinkedAccounts: 2,
    points: 10,
  },

  SHARED_ADDRESS: {
    // Triggers when >= this many OTHER accounts use the same address
    minLinkedAccounts: 3,
    points: 20,
  },

  SHARED_PHONE: {
    minLinkedAccounts: 3,
    points: 15,
  },

  SHARED_DEVICE: {
    minLinkedAccounts: 3,
    points: 25,
  },

  FAILED_PAYMENT: {
    windowMinutes: 10,
    minAttempts: 3,
    points: 20,
  },

  HIGH_VALUE: {
    amountThreshold: 100000, // e.g. ₹1,00,000
    points: 15,
  },

  VELOCITY: {
    windowMinutes: 60,
    minTransactions: 5,
    points: 20,
  },

  NEW_ACCOUNT: {
    maxAgeDays: 7,
    points: 10,
  },

  SUSPICIOUS_IP: {
    points: 15,
    // Simple static blocklist for demo purposes. In a real system this
    // could be a DB collection or a third-party IP-reputation service.
    blacklist: ['0.0.0.0', '1.1.1.1', '123.123.123.123'],
  },

  // Score -> Risk Level thresholds
  RISK_LEVELS: {
    LOW_MAX: 39,
    MEDIUM_MAX: 69,
    // anything above MEDIUM_MAX is HIGH
  },
};

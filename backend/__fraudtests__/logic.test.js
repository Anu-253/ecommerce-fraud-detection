/**
 * Isolated unit tests for the PURE fraud logic:
 *   fraud/rules/*.js, fraud/riskScoring.js, fraud/decisionEngine.js, fraud/fraudDetection.js
 *
 * These do NOT touch MongoDB or contextBuilder.js — they build a fake
 * "context" object by hand (exactly the shape contextBuilder produces)
 * and feed it directly to evaluateTransaction(). This lets us verify the
 * scoring/threshold/rule math with certainty, independent of DB/network
 * availability.
 *
 * Run: node __fraudtests__/logic.test.js
 */
const assert = require('assert');
const config = require('../fraud/config');
const { evaluateTransaction, runRules } = require('../fraud/fraudDetection');
const { calculateRiskScore } = require('../fraud/riskScoring');
const { decideAction } = require('../fraud/decisionEngine');
const rules = require('../fraud/rules');

let pass = 0, fail = 0;
const results = [];

function test(name, fn) {
  try {
    fn();
    pass++;
    results.push({ name, status: 'PASS' });
    console.log(`PASS - ${name}`);
  } catch (e) {
    fail++;
    results.push({ name, status: 'FAIL', error: e.message });
    console.log(`FAIL - ${name}`);
    console.log(`       ${e.message}`);
  }
}

// Baseline "clean" context — every field a rule reads, set to the
// non-triggering value.
function baseContext(overrides = {}) {
  return {
    order: { userId: 'u1', amount: 2000, ipAddress: '9.9.9.9', deviceId: 'dev-1' },
    account: {},
    accountsSharingAddress: [],
    accountsSharingPhone: [],
    accountsSharingDevice: [],
    accountsForCustomer: [],
    failedPaymentsLast10Min: 0,
    transactionsLastHour: 0,
    accountAgeDays: 400,
    isNewAccount: false,
    isBlacklistedIp: false,
    isUnfamiliarIp: false,
    ...overrides,
  };
}

// ---------------------------------------------------------------------
// TEST A — NORMAL TRANSACTION (no signals at all)
// ---------------------------------------------------------------------
test('A. Normal transaction -> LOW / APPROVE / no triggered rules', () => {
  const ctx = baseContext();
  const result = evaluateTransaction(ctx);
  assert.strictEqual(result.riskScore, 0, `expected score 0, got ${result.riskScore}`);
  assert.strictEqual(result.riskLevel, 'LOW');
  assert.strictEqual(result.decision, 'APPROVE');
  assert.strictEqual(result.triggeredRules.length, 0);
});

// ---------------------------------------------------------------------
// TEST B — HIGH VALUE ORDER (threshold read from config, not invented)
// ---------------------------------------------------------------------
test('B. High-value order at exactly config threshold -> HIGH_VALUE triggers', () => {
  const threshold = config.HIGH_VALUE.amountThreshold; // 100000
  const ctx = baseContext({ order: { userId: 'u1', amount: threshold, ipAddress: '9.9.9.9', deviceId: 'd1' } });
  const result = evaluateTransaction(ctx);
  const hv = result.triggeredRules.find((r) => r.ruleCode === 'HIGH_VALUE');
  assert.ok(hv, 'HIGH_VALUE rule should have triggered');
  assert.strictEqual(hv.points, config.HIGH_VALUE.points);
  assert.strictEqual(result.riskScore, config.HIGH_VALUE.points);
  // 15 points -> LOW (LOW_MAX=39) per current thresholds
  assert.strictEqual(result.riskLevel, 'LOW');
  assert.strictEqual(result.decision, 'APPROVE');
});

test('B2. Order just BELOW threshold -> HIGH_VALUE does NOT trigger', () => {
  const threshold = config.HIGH_VALUE.amountThreshold;
  const ctx = baseContext({ order: { userId: 'u1', amount: threshold - 1, ipAddress: '9.9.9.9', deviceId: 'd1' } });
  const result = evaluateTransaction(ctx);
  const hv = result.triggeredRules.find((r) => r.ruleCode === 'HIGH_VALUE');
  assert.ok(!hv, 'HIGH_VALUE should NOT trigger just below threshold');
});

// ---------------------------------------------------------------------
// TEST C — MULTIPLE FAILED PAYMENTS
// ---------------------------------------------------------------------
test('C. Failed payments at configured minAttempts -> FAILED_PAYMENT triggers', () => {
  const { minAttempts, points } = config.FAILED_PAYMENT;
  const ctx = baseContext({ failedPaymentsLast10Min: minAttempts });
  const result = evaluateTransaction(ctx);
  const fp = result.triggeredRules.find((r) => r.ruleCode === 'FAILED_PAYMENT');
  assert.ok(fp, 'FAILED_PAYMENT should have triggered');
  assert.strictEqual(fp.points, points);
});

test('C2. Failed payments ONE BELOW minAttempts -> does not trigger', () => {
  const { minAttempts } = config.FAILED_PAYMENT;
  const ctx = baseContext({ failedPaymentsLast10Min: minAttempts - 1 });
  const result = evaluateTransaction(ctx);
  const fp = result.triggeredRules.find((r) => r.ruleCode === 'FAILED_PAYMENT');
  assert.ok(!fp, 'FAILED_PAYMENT should not trigger below threshold');
});

// ---------------------------------------------------------------------
// TEST D — MULTIPLE ACCOUNTS
// ---------------------------------------------------------------------
test('D. accountsForCustomer >= minLinkedAccounts -> MULTIPLE_ACCOUNT triggers', () => {
  const { minLinkedAccounts, points } = config.MULTIPLE_ACCOUNT;
  const linked = Array.from({ length: minLinkedAccounts }, (_, i) => `other-${i}`);
  const ctx = baseContext({ accountsForCustomer: linked });
  const result = evaluateTransaction(ctx);
  const ma = result.triggeredRules.find((r) => r.ruleCode === 'MULTIPLE_ACCOUNT');
  assert.ok(ma, 'MULTIPLE_ACCOUNT should have triggered');
  assert.strictEqual(ma.points, points);
});

// ---------------------------------------------------------------------
// TEST E — SAME ADDRESS
// ---------------------------------------------------------------------
test('E. accountsSharingAddress >= minLinkedAccounts -> SHARED_ADDRESS triggers', () => {
  const { minLinkedAccounts, points } = config.SHARED_ADDRESS;
  const linked = Array.from({ length: minLinkedAccounts }, (_, i) => `addr-${i}`);
  const ctx = baseContext({ accountsSharingAddress: linked });
  const result = evaluateTransaction(ctx);
  const sa = result.triggeredRules.find((r) => r.ruleCode === 'SHARED_ADDRESS');
  assert.ok(sa, 'SHARED_ADDRESS should have triggered');
  assert.strictEqual(sa.points, points);
});

// ---------------------------------------------------------------------
// TEST F — MULTIPLE SIGNALS COMBINED
// ---------------------------------------------------------------------
test('F. Multiple simultaneous signals -> all applicable rules fire, score sums, level/decision correct', () => {
  const ctx = baseContext({
    order: { userId: 'u1', amount: config.HIGH_VALUE.amountThreshold, ipAddress: '1.1.1.1', deviceId: 'd1' },
    failedPaymentsLast10Min: config.FAILED_PAYMENT.minAttempts,
    accountsSharingAddress: Array.from({ length: config.SHARED_ADDRESS.minLinkedAccounts }, (_, i) => `a${i}`),
    accountsForCustomer: Array.from({ length: config.MULTIPLE_ACCOUNT.minLinkedAccounts }, (_, i) => `a${i}`),
    isBlacklistedIp: true, // 1.1.1.1 is in the static blacklist
  });
  const result = evaluateTransaction(ctx);
  const codes = result.triggeredRules.map((r) => r.ruleCode).sort();
  assert.deepStrictEqual(
    codes,
    ['FAILED_PAYMENT', 'HIGH_VALUE', 'MULTIPLE_ACCOUNT', 'SHARED_ADDRESS', 'SUSPICIOUS_IP'].sort()
  );
  const expectedScore =
    config.HIGH_VALUE.points +
    config.FAILED_PAYMENT.points +
    config.SHARED_ADDRESS.points +
    config.MULTIPLE_ACCOUNT.points +
    config.SUSPICIOUS_IP.points; // 15+20+20+10+15 = 80
  assert.strictEqual(result.riskScore, Math.min(expectedScore, 100));
  assert.strictEqual(result.riskLevel, 'HIGH'); // 80 > MEDIUM_MAX(69)
  assert.strictEqual(result.decision, 'HOLD');
});

// ---------------------------------------------------------------------
// Risk level boundary tests (independent of rules, straight at riskScoring.js)
// ---------------------------------------------------------------------
test('Boundary: score==LOW_MAX -> LOW', () => {
  const { riskLevel } = calculateRiskScore([{ points: config.RISK_LEVELS.LOW_MAX }]);
  assert.strictEqual(riskLevel, 'LOW');
});
test('Boundary: score==LOW_MAX+1 -> MEDIUM', () => {
  const { riskLevel } = calculateRiskScore([{ points: config.RISK_LEVELS.LOW_MAX + 1 }]);
  assert.strictEqual(riskLevel, 'MEDIUM');
});
test('Boundary: score==MEDIUM_MAX -> MEDIUM', () => {
  const { riskLevel } = calculateRiskScore([{ points: config.RISK_LEVELS.MEDIUM_MAX }]);
  assert.strictEqual(riskLevel, 'MEDIUM');
});
test('Boundary: score==MEDIUM_MAX+1 -> HIGH', () => {
  const { riskLevel } = calculateRiskScore([{ points: config.RISK_LEVELS.MEDIUM_MAX + 1 }]);
  assert.strictEqual(riskLevel, 'HIGH');
});
test('Score is capped at 100 even if raw sum exceeds it', () => {
  const { riskScore } = calculateRiskScore([{ points: 60 }, { points: 60 }]);
  assert.strictEqual(riskScore, 100);
});

// ---------------------------------------------------------------------
// decisionEngine mapping — confirm actual LOW/MEDIUM/HIGH -> action mapping
// ---------------------------------------------------------------------
test('decisionEngine: LOW -> APPROVE, MEDIUM -> VERIFY, HIGH -> HOLD', () => {
  assert.strictEqual(decideAction('LOW'), 'APPROVE');
  assert.strictEqual(decideAction('MEDIUM'), 'VERIFY');
  assert.strictEqual(decideAction('HIGH'), 'HOLD');
});
test('decisionEngine: unknown level fails safe to VERIFY (never silent APPROVE)', () => {
  assert.strictEqual(decideAction('BOGUS'), 'VERIFY');
});

// ---------------------------------------------------------------------
// Edge cases (section 7)
// ---------------------------------------------------------------------
test('Edge: zero order amount does not crash and does not trigger HIGH_VALUE', () => {
  const ctx = baseContext({ order: { userId: 'u1', amount: 0, ipAddress: '9.9.9.9', deviceId: 'd1' } });
  const result = evaluateTransaction(ctx);
  assert.ok(!result.triggeredRules.find((r) => r.ruleCode === 'HIGH_VALUE'));
  assert.strictEqual(result.riskLevel, 'LOW');
});

test('Edge: negative order amount does not crash (documents current behavior: NOT flagged)', () => {
  const ctx = baseContext({ order: { userId: 'u1', amount: -500, ipAddress: '9.9.9.9', deviceId: 'd1' } });
  const result = evaluateTransaction(ctx);
  // highValue.js only checks amount >= threshold; a negative amount is
  // mathematically "within range" under the current rule, so it is
  // silently approved. This is flagged as a finding in the report, not
  // asserted as "correct" — the assertion just documents present behavior.
  assert.strictEqual(result.decision, 'APPROVE');
});

test('Edge: rules array skips a rule when enabled === false (registry respects the flag)', () => {
  const disabled = rules.filter((r) => r.enabled === false);
  // SHARED_PHONE is intentionally disabled (Issue 1 decision: phone was
  // never part of the app's data model). Every other rule must stay live.
  assert.strictEqual(disabled.length, 1, `expected exactly 1 disabled rule, found ${disabled.length}`);
  assert.strictEqual(disabled[0].ruleCode, 'SHARED_PHONE');
  assert.strictEqual(rules.length, 9, `expected 9 registered rules, found ${rules.length}`);
});

test('SHARED_PHONE is registered but never contributes to the score now that it is disabled', () => {
  const { minLinkedAccounts, points } = config.SHARED_PHONE;
  const linked = Array.from({ length: minLinkedAccounts }, (_, i) => `p${i}`);
  const ctx = baseContext({ accountsSharingPhone: linked });
  const result = evaluateTransaction(ctx);
  const sp = result.triggeredRules.find((r) => r.ruleCode === 'SHARED_PHONE');
  assert.ok(!sp, 'SHARED_PHONE must not appear in triggeredRules while disabled, even with matching context data');
  assert.strictEqual(result.riskScore, 0);
});

// ---------------------------------------------------------------------
console.log('\n--- SUMMARY ---');
console.log(`PASS: ${pass}  FAIL: ${fail}  TOTAL: ${pass + fail}`);
if (fail > 0) process.exitCode = 1;

const express = require("express");
const FraudCase = require("../models/FraudCase");
const { protect, admin } = require("../Middleware/authmiddleware");
const router = express.Router();

// GET /api/fraud-cases?status=OPEN
// List fraud cases, optionally filtered by status. Admin-only (this is the
// fraud-analyst queue).
router.get("/", protect, admin, async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};

        const cases = await FraudCase.find(filter)
            .populate("order")
            .populate("assessment")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(cases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET /api/fraud-cases/:id
// Full detail for one case — order, assessment, triggered rules, the user.
router.get("/:id", protect, admin, async (req, res) => {
    try {
        const fraudCase = await FraudCase.findById(req.params.id)
            .populate("order")
            .populate("assessment")
            .populate("user", "name email");

        if (!fraudCase) {
            return res.status(404).json({ message: "Fraud case not found" });
        }

        res.status(200).json(fraudCase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PUT /api/fraud-cases/:id/decision
// Body: { decision: 'APPROVED' | 'REJECTED' | 'CONFIRMED_FRAUD' | 'LEGITIMATE', notes?: string }
// Where a fraud analyst records their final call on a HIGH-risk order.
router.put("/:id/decision", protect, admin, async (req, res) => {
    const ALLOWED_DECISIONS = ["APPROVED", "REJECTED", "CONFIRMED_FRAUD", "LEGITIMATE"];
    try {
        const { decision, notes } = req.body;

        if (!ALLOWED_DECISIONS.includes(decision)) {
            return res.status(400).json({
                message: `decision must be one of: ${ALLOWED_DECISIONS.join(", ")}`,
            });
        }

        const fraudCase = await FraudCase.findById(req.params.id);
        if (!fraudCase) {
            return res.status(404).json({ message: "Fraud case not found" });
        }

        fraudCase.status = decision;
        fraudCase.decisionNotes = notes || "";
        fraudCase.resolvedAt = new Date();
        await fraudCase.save();

        res.status(200).json(fraudCase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

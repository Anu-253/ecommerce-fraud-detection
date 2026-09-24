const express = require("express");
const Order = require("../models/order");
const { applyFraudCheck } = require("../fraud/applyFraudCheck"); // NEW
const {protect} = require("../Middleware/authmiddleware");
const router = express.Router();

//get all orders
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders=await Order.find({user:req.user._id}).populate("user", "name email").sort({createdAt:-1});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
        
    });
    //get order by id
    router.get("/:id", protect, async (req, res) => {
        try {
            const order=await Order.findById(req.params.id).populate("user", "name email");
            if(!order){
                return res.status(404).json({message:"Order not found"});
            }
            //order
            res.status(200).json(order);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Internal server error"});
        }
    });

    // Create new order
router.post("/", protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      // FIX (Issue 4): isPaid / paidAt / paymentStatus / status are
      // intentionally NOT read from req.body anymore. This route has no
      // payment-verification step of its own (that only happens via the
      // checkout -> /:id/pay -> /:id/finalize flow), so a client could
      // previously mark their own order paid/delivered directly. This
      // route now always creates orders in the same "unpaid, pending,
      // Processing" state the Order schema already defaults to; the fraud
      // engine still runs exactly as before on top of that.
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // FIX (Issue 5): reject non-positive per-item price/quantity before they
    // can silently produce a totalPrice of 0 or less.
    const hasInvalidItem = orderItems.some(
      (item) => !(Number(item.price) > 0) || !(Number(item.quantity) > 0)
    );
    if (hasInvalidItem) {
      return res.status(400).json({ message: "Each order item must have a positive price and quantity" });
    }

    // Calculate totalPrice
    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // FIX (Issue 5): belt-and-suspenders check on the computed total itself.
    if (!(totalPrice > 0)) {
      return res.status(400).json({ message: "Order total must be greater than zero" });
    }

    const newOrder = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      // isPaid, paidAt, paymentStatus, status all left unset here on purpose
      // so the Order schema's own defaults apply (isPaid: false,
      // paymentStatus: "pending", status: "Processing").
      // NEW: capture request-level fraud signals on the order itself
      ipAddress: req.ip,
      deviceId: req.body.deviceId || null,
    });

    const savedOrder = await newOrder.save();

    // NEW: run the fraud engine now that the order exists
    const fraudResult = await applyFraudCheck(savedOrder);

    // Backward-compatible response: every original order field stays at the
    // top level, with one extra "fraud" key added.
    res.status(201).json({ ...savedOrder.toObject(), fraud: fraudResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


    module.exports = router;
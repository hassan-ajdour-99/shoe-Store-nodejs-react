import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @description : Fetch All Orders
// @route : POST /api/orders
// Access : PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
  const { username, orderItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("No Order Items");
  } else {
    const order = Order({
      username,
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    const createdOrder = await order.save();
    // Status 202 Refers to smt created
    res.status(202).json(createdOrder);
  }
});

// get all Orders for every User
// @description : Fetch Single order
// @route : POST /api/orders
// Access : PUBLIC
const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });
  if (order) {
    res.json(order);
  } else {
    res.status(401);
    throw new Error("order Not Found!");
  }
});

// get all Orders
// @description : Fetch all orders
// @route : POST /api/orders
// Access : Admin/only
const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("user", "id email");
  if (order) {
    res.json(order);
  } else {
    res.status(401);
    throw new Error("order Not Found!");
  }
});

// Order details
// @description : Fetch Single order
// @route : POST /api/orders/:id
// Access : PUBLIC
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(401);
    throw new Error("order Not Found!");
  }
});

// Update Order to Paid!
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.update_time,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updateOrder = await order.save();

    res.status(201).json(updateOrder);
  } else {
    res.status(401);
    throw new Error("order Not Found!");
  }
});

// Update Order to Delivery
//  @ Route Get api/order/:id/deliver
// PRIVATE : ADMIN ONLY
const UpdateOrderIsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveryAt = Date.now();

    const updateOrder = await order.save();
    res.status(201).json(updateOrder);
  } else {
    res.status(401);
    throw new Error("order Not Found!");
  }
});

// Delete Order
//  @ Route Get api/order/delete
// PRIVATE : ADMIN ONLY
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: "Order deleted successfully" });
    console.log("order deleted");
  } else {
    res.status(401).send("Order Not Found");
  }
});

export {
  addOrderItems,
  getOrderById,
  UpdateOrderToPaid,
  UpdateOrderIsDelivered,
  getAllOrders,
  getOrders,
  deleteOrder,
};

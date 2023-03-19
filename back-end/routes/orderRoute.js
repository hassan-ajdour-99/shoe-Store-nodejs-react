import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  UpdateOrderToPaid,
  UpdateOrderIsDelivered,
  getAllOrders,
  getOrders,
  deleteOrder,
} from "../controllers/orderControllers.js";
import { protect, admin } from "../Middelware/authenticationMiddalware.js";

// Orders
router.route("/").post(protect, addOrderItems);
router.route("/").get(protect, admin, getOrders);
router.route("/:id").delete(protect, admin, deleteOrder);
router.route("/myorders").get(protect, getAllOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, UpdateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, UpdateOrderIsDelivered);

export default router;

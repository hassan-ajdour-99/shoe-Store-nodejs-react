import express from "express";
const router = express.Router();
import { protect, admin } from "../Middelware/authenticationMiddalware.js";
import {
  getProductByCategory,
  createNewProduct,
  getProducts,
  getProductById,
  deleteProduct,
  UpdateProduct,
  CreateUserReview,
  getTopProducts,
} from "../controllers/productControllers.js";

// PRODUCTS
router.route("/").get(getProducts);

// Get Top Products
router.get("/top", getTopProducts);

// PRODUCT CATEGORY
router.get("/category", getProductByCategory);

// PRODUCT DETAIL
router.route("/:id").get(getProductById);

// DELETE PRODUCT
router.route("/:id").delete(protect, admin, deleteProduct);

// CREATE NEW PRODUCT
router.route("/").post(protect, admin, createNewProduct);

// UPDATE PRODUCT
router.route("/:id").put(protect, admin, UpdateProduct);

// CREATE REVIEW PRODUCT
router.route("/:id/reviews").post(protect, CreateUserReview);

export default router;

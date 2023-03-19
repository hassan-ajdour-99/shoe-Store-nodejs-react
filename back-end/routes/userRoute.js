import express from "express";
const router = express.Router();
import { protect, admin } from "../Middelware/authenticationMiddalware.js";
import {
  userAuth,
  userRegister,
  userProfile,
  userUpdateProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

router.route("/").post(userRegister).get(protect, admin, getAllUsers);
router.post("/login", userAuth);
router.route("/profile").get(protect, userProfile);
router.route("/profile").put(protect, userUpdateProfile);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;

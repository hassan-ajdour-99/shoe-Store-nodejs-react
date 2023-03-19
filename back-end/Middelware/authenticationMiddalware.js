import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const Headers = req.headers;

  if (Headers.authorization && Headers.authorization.startsWith("Bearer")) {
    try {
      // Return to empty array with Index 1 OF Headers
      token = Headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log(decoded);

      // Fetch user // Passing User By Id // Select => without Return to PASSWORD
      req.user = await User.findById(decoded.id).select("-password");

      // GET USERS WITHOUT PASSWORD
      // console.log(req.user);
    } catch (error) {
      console.error(error);
      res.status(401).send({
        message: "No, Authorized, No Token ... Token Failed!",
      });
    }
  }

  if (!token) {
    res
      .status(401)
      .send({ message: "No, Authorized, No Token ... Token Failed!" });
  }
  next();
});

// Admin Route & protection
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("No authorized as an admin");
  }
};

export { protect, admin };

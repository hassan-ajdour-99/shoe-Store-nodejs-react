import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { PageNotFound404, errorHandler } from "./Middelware/errorMiddlware.js";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// allow to use Json
app.use(express.json());

// Products
app.use("/api/products", productRoute);

// Users
app.use("/api/users", userRoute);

// Orders
app.use("/api/orders", orderRoute);

// Image Upload Route
app.use("/api/upload", uploadRoute);

// Payment Paypal
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_PAYMENT_ID)
);

// Use static folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Production
if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.join(__dirname, "/front-end/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is Running .........!");
  });
}

// Use 404 Route
app.use(PageNotFound404);

// Use Middleware to protect Rout
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
);

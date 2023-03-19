import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @description : Fetch All Products
// @route : GET /api/products
// Access : Public Anyone
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;

  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @description : Fetch Single Product By Id
// @route : GET /api/product/id
// Access : Public Anyone
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
    console.log(product._id);
  } else {
    res.status(404).send(" Page Not Found");
  }
});

// @description : Delete product
// @route : GET /api/product/delete
// Access : Only Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(401).send("Product Not Found");
  }
});

// @description : create product
// @route : POST /api/product/create
// Access : Only Admin
const createNewProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "chair",
    price: 99.99,
    image: "/images/phon1.png",
    brand: "brand",
    category: "accessories",
    countInStock: 1,
    rating: 4.0,
    numReviews: 6,
    description: "description",
  });

  const createdProduct = await product.save();

  if (createdProduct) {
    res.status(201).json(createdProduct);
    console.log(createdProduct);
  } else {
    res.status(401);
    throw new Error("product is not Added");
  }
});

// @description : update product
// @route : PUT /api/product/id
// Access : Only Admin
const UpdateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(401);
    throw new Error("Product Not Updated");
  }
});

// @description : Create User Review
// @route : POST /api/product/:id/review
// Access : PUBLIC
const CreateUserReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(401);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    // Update Number of reviews
    product.numReviews = product.reviews.length;

    // Set avarage rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review Added Successfully!" });
  } else {
    res.status(401);
    throw new Error("Something went Wrong! Review Not Added");
  }
});

// @description : Get Top rated Products
// @route : POST /api/toProduct
// Access : PUBLIC
const getTopProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({}).sort({ rating: -1 }).limit(3);

  if (product) {
    res.json(product);
  }
});

// @description : Fetch All Products By Category
// @route : GET /api/product/id
// Access : Public Anyone
const getProductByCategory = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  res.status(201).json(product);
});

export {
  getProducts,
  getProductByCategory,
  getProductById,
  deleteProduct,
  createNewProduct,
  UpdateProduct,
  CreateUserReview,
  getTopProducts,
};

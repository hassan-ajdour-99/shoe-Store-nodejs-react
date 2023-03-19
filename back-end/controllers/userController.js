import asyncHandler from "express-async-handler";
import generateToken from "../utils/jswToken.js";
import User from "../models/userModel.js";

// @description : Auth user & get Token
// @route : GET /api/user/login
// Access : Public Anyone
const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //   Find user By Email
  const user = await User.findOne({ email });

  //   Check userAuthentication
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    console.log("user Authentication successful");
  } else {
    res.status(401);
    throw new Error("Invalid email or Password ");
  }

  res.json({ email, password });
});

// @description : Auth user Profile
// @route : GET /api/user/profile
// Access : Private
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Find EXISTING USER  by Id
  const existingUser = await User.findOne({ email });
  // Check id user is already
  if (existingUser) {
    res.status(401);
    throw new Error("user is already exists");
  }

  const newUser = await User.create({ name, email, password });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Something went Wrong");
  }
});

// @description : Auth user Profile
// @route : GET /api/user/profile
// Access : Private
const userProfile = asyncHandler(async (req, res) => {
  //     Find user By Id
  // Find USER BY ID
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    console.log(user);
  } else {
    res.status(401);
    throw new Error(" User Not Found");
  }
});

// @description : Auth user Profile
// @route : PUT /api/user/profile
// Access : Private
const userUpdateProfile = asyncHandler(async (req, res) => {
  //     Find user By Id
  // Find USER BY ID
  const user = await User.findById(req.user._id);

  // Upadate User Info
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error(" User Not Found");
  }
});

// @description : get all users
// @route : GET /api/users
// Access : Private/ Admin Only
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  }
});

// @description : delete user bu id
// @route : GET /api/user/delete
// Access : Private/ Admin Only
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.remove();
    res.status(201).json({ message: "user removed successfully" });
  } else {
    res.status(401);
    throw new Error("User not Found");
  }
});

export {
  userAuth,
  userRegister,
  userProfile,
  userUpdateProfile,
  getAllUsers,
  deleteUser,
};

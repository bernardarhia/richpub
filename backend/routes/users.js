const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registrationValidation,
  loginValidation,
  updateValidation,
} = require("../validation/validations");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/fileUpload");

router.get("/is-auth", (req, res) => {
  if (req.cookies["auth-token"]) res.status(200).send(true);
  return res.status(400).send(false);
});
// Register a new user
router.post("/register", async (req, res) => {
  // Destruct the user data
  const { username, email, password } = req.body;

  //   validate the user data coming in
  const { error } = registrationValidation(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  // check if user already exists
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).send(emailExist);
  }
  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const user = new User({
    username,
    email,
    password: hashedPassword,
    role: "client",
  });

  try {
    const newUser = await user.save();
    // create and assign user a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("role", user.role, {
      maxAge: 1000000,
      httpOnly: true,
    });
    return res
      .cookie("auth-token", token, {
        maxAge: 1000000,
        httpOnly: true,
      })
      .json({ _id: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  // Destruct the user data
  const { email, password } = req.body;

  try {
    //   validate the user data coming in
    const { error } = loginValidation(req.body);
    if (error) res.status(400).send({ error: error.details[0].message });

    // check if user doesn't exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Email or password is wrong" });

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Email or password is wrong" });

    // create and assign user a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("role", user.role, {
      maxAge: 1000000,
      httpOnly: true,
    });
    return res
      .cookie("auth-token", token, {
        maxAge: 1000000,
        httpOnly: true,
      })
      .json({ _id: user._id, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Logout user
router.post("/logout", verifyToken, async (req, res) => {
  res.clearCookie("role");
  res.clearCookie("auth-token");
  res.status(200).send(true);
});

// Get a user's details
router.get("/me", verifyToken, async (req, res) => {
  // Get user stored in the verified token
  const { user } = req;
  const userId = user._id;

  try {
    const user = await User.findOne({ _id: userId });
    const { _id, email, username } = user;
    if (!user) return res.status(404).send("User not found");
    return res.status(200).send({ _id, email, username });
  } catch (error) {
    return res.status(400).send("Unable to fetch user");
  }
});

// Update user profile
router.put("/update-profile", verifyToken, async (req, res) => {
  // Get user stored in the verified token
  const { user } = req;
  const userId = user._id;

  const { email, username } = req.body;

  //   validate the user data coming in
  const { error } = updateValidation(req.body);
  if (error) return res.status(400).send({error: error.details[0].message});

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send({error:"User not found"});

    return res
      .status(200)
      .send({ email: updatedUser.email, username: updatedUser.username });
  } catch (error) {
    return res.status(400).send({ error: "Unable to fetch user" });
  }
});

// Upload user image
router.post(
  "/me/upload",
  verifyToken,
  upload().single("upload"),
  async (req, res) => {
    const { user } = req;
    const userId = user._id;

    try {
      const savedImage = await User.findByIdAndUpdate(
        userId,
        { avatar: req.file.buffer },
        { new: true }
      );
      if (!savedImage) return res.status(404).send("User not found");

      res.status(200).send({ success: true });
    } catch (error) {
      res.send(error);
      res.status(400).send("Unable to fetch user");
    }
    // Get's image's errors
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Get user image
router.get("/me/:id/upload", async (req, res) => {
  try {
    const userImage = await User.findById(req.params.id);
    res.set("Content-Type", "image/jpg");
    res.status(200).send(userImage.avatar);
  } catch (error) {
    res.status(400).send({ error: true });
  }
});
module.exports = router;

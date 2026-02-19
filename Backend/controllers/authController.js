const { validationResult, check } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔐 ADMIN LOGIN (from .env)
    const isAdminEmail = email === process.env.ADMIN_EMAIL;
    const isAdminPassword = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (isAdminEmail && isAdminPassword) {
      req.session.user = {
        email,
        role: "admin"
      };

      return res.status(200).json({
        message: "Admin login successful",
        role: "admin"
      });
    }

    // 👤 NORMAL USER LOGIN
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      role: "user"
    };

    res.status(200).json({
      message: "User login successful",
      role: "user"
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.postSignup = [
  check("firstname")
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 2 }).withMessage("First name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("First name must contain only letters"),

  check("lastname")
    .optional()
    .matches(/^[a-zA-Z\s]*$/).withMessage("Last name must contain only letters"),

  check("email")
    .isEmail().withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Must contain one uppercase letter")
    .matches(/[a-z]/).withMessage("Must contain one lowercase letter")
    .matches(/[0-9]/).withMessage("Must contain one number")
    .matches(/[!@#$%^&*]/).withMessage("Must contain one special character"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map(err => err.msg)
      });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword
      });

      await user.save();

      res.status(201).json({ message: "Signup successful" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
];



const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const isAdmin = require("../middleware/isAdmin");


router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);


router.get("/admin/data", isAdmin, (req, res) => {
  res.json({ message: "Only admin can see this" });
});

module.exports = router;

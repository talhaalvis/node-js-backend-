const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  forgotPassword,
} = require("../Controllers/UserController");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/reset").post(forgotPassword);
router.route("/logout").get(logOutUser);
module.exports = router;

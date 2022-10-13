const express = require("express");
const router = express.Router();

const {
  Register,
  Verify,
  Login,
  forgetPassword,
  resetPassword,
  resetNewPassword
} = require("../controllers/authController");

router.post("/register", Register);
router.post("/login", Login);
router.post("/verify", Verify);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword", resetPassword);
router.post("/resetNewPassword", resetNewPassword);

module.exports = router;

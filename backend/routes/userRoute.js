const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile } = require("../controllers/userController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticateUser, getUserDetails)
router.route("/password/update").put(isAuthenticateUser, updatePassword)
router.route("/me/update").put(isAuthenticateUser, updateUserProfile)

module.exports = router;
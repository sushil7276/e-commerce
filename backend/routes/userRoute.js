const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsers, getSingleUser, adminUpdateUserProfile, adminDeleteUserProfile } = require("../controllers/userController");
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

// only admin access
router.route("/admin/user").get(isAuthenticateUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id")
    .get(isAuthenticateUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticateUser, authorizeRoles("admin"), adminUpdateUserProfile)
    .delete(isAuthenticateUser, authorizeRoles("admin"), adminDeleteUserProfile)

module.exports = router;
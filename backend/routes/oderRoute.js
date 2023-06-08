const express = require("express");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const { newOrder } = require("../controllers/oderController");
const router = express.Router()


router.route("/order/new").post(isAuthenticateUser, newOrder);



module.exports = router;
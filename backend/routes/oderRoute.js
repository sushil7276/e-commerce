const express = require("express");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders } = require("../controllers/oderController");
const router = express.Router()


router.route("/order/new").post(isAuthenticateUser, newOrder);
router.route("/order/:id").get(isAuthenticateUser, authorizeRoles("admin"), getSingleOrder);
router.route("/orders/me").get(isAuthenticateUser, myOrders);



module.exports = router;
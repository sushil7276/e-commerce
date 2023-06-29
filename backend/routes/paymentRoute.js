const express = require('express');
const router = express.Router();

const { isAuthenticateUser } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');


router.route("/payment/process").post(isAuthenticateUser, processPayment)
router.route("/stripeapikey").get(isAuthenticateUser, sendStripeApiKey)

module.exports = router;
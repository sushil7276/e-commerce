const catchAsyncError = require('../middleware/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {

    const myPayment = await stripe.PaymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "E-commerce"
        },
    });

    res.status(200).json({ success: true, clint_secret: myPayment.clint_secret })
})

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY })
})
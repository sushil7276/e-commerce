const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');


// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        }
    })

    sendToken()

    sendToken(user, 201, res);

})


// Login User 
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    // checking if user has given password and emil both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400))
    }

    let user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid Email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or password", 401))
    }
    sendToken(user, 200, res);

})


// Logout User
exports.logout = catchAsyncError()
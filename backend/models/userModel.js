const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        // minLength: [4, "Name should have more than 4 characters"]
    },

    email: {
        type: String,
        required: [true, "please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },

    password: {
        type: String,
        required: [true, "please Enter your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,      // "select" means = if you use find() the password filed not show
    },

    avatar: {

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    role: {
        type: String,
        default: 'user'
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JET_EXPIRE
    })
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const path = require("path");

const errorMiddleware = require("./middleware/error");

// if project run on Development
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" });
}


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Import
const product = require('./routes/productRoute');
const user = require("./routes/userRoute");
const order = require("./routes/oderRoute");
const payment = require("./routes/paymentRoute")
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// Backend run react build file
app.use(express.static(path.join(__dirname, "../frontend/build")));

// backend return one file (single page application)
app.get("/*", (req, res) => {
    // react return component
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
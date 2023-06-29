const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const dotenv = require('dotenv')

const errorMiddleware = require("./middleware/error");

// config
dotenv.config({ path: "backend/config/config.env" });

app.use(cors());
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


// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
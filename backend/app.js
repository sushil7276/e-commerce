const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');

const errorMiddleware = require("./middleware/error");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Import
const product = require('./routes/productRoute');
const user = require("./routes/userRoute");
const order = require("./routes/oderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);


// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
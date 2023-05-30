const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/aoiFeatures');



// create product ---> Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.create(req.body)
        .then((product) => {
            res.status(201).json({
                success: true,
                product
            })
        })


});

// Get All Product
exports.getAllProduct = catchAsyncError(async (req, res) => {

    const resultPerPage = 5
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

    const product = await apiFeature.query

    res.status(200).json({
        success: true,
        product,
        productCount,
    })

})

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
        .then((product) => {
            res.status(201).json({
                success: true,
                product
            })
        })
        .catch(() => {
            next(new ErrorHandler("Product not found", 404))
        });



})

// Update Product ----> Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
        .then(async (product) => {
            // Update Query
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }).then((product) => {
                res.status(200).json({
                    success: true,
                    product
                })
            })

        })
        .catch(() => {
            next(new ErrorHandler("Product not found", 404))
        })

})


// Delete Product ----> Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id)
        .then(async (product) => {
            await Product.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({
                    success: true,
                    message: "Product Deleted Successfully"
                })
            })

        })
        .catch(() => {
            next(new ErrorHandler("Product not found", 404))
        })

})

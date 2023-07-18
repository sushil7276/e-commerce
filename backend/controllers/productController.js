const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/aoiFeatures');
const cloudinary = require('cloudinary')


// create product ---> Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        // single image store
        images.push(req.body.images);

    } else {
        // Multiple images store
        images = req.body.images;
    }


    // push images to cloudinary
    const imagesLinks = [];


    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    // Now store the url in DB
    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body)
        .then((product) => {
            res.status(201).json({
                success: true,
                product
            })
        })


});

// Get All Product
exports.getAllProduct = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;

    // total product count
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;

    //search filter
    // const apiFeature = new ApiFeatures(Product.find(), req.query)
    //     .search()
    //     .filter();

    // let products = await apiFeature.query;

    //     //after search filter apply then count product
    let filteredProductsCount = products.length;
    // apiFeature.pagination(resultPerPage);

    // products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });

});


// Get All Product (Admin)
exports.getAdminProduct = catchAsyncError(async (req, res, next) => {

    const products = await Product.find();


    res.status(200).json({
        success: true,
        products,
    });

});


// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    await Product.findById(req.params.id)
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
    // let product = await Product.findById(req.params.id)
    //     .then(async (product) => {
    //         // Update Query
    //         product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    //             new: true,
    //             runValidators: true,
    //             useFindAndModify: false
    //         }).then((product) => {
    //             res.status(200).json({
    //                 success: true,
    //                 product
    //             })
    //         })

    //     })
    //     .catch(() => {
    //         next(new ErrorHandler("Product not found", 404))
    //     })

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Images Start here
    let images = [];

    if (typeof req.body.images === "string") {
        // single image store
        images.push(req.body.images);

    } else {
        // Multiple images store
        images = req.body.images;
    }

    // If images is already there then Delete images from Cloudinary
    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], { folder: "products" });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    })

});


// Delete Product ----> Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    // let product = await Product.findById(req.params.id)
    //     .then(async (product) => {
    //         await Product.findByIdAndDelete(req.params.id).then(() => {
    //             res.status(200).json({
    //                 success: true,
    //                 message: "Product Deleted Successfully"
    //             })
    //         })

    //     })
    //     .catch(() => {
    //         next(new ErrorHandler("Product not found", 404))
    //     })

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    // Deleting Images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }


    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });

});


// Create New Review or Update the Review
exports.CreateProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => {
        rev.user.toString() === req.user._id.toString()
    })


    if (isReviewed) {

        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        })

    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }


    // average product rating
    let avg = 0
    product.reviews.forEach((rev) => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length;

    // save product and review
    await product.save({ validateBeforeSave: true });

    res.status(200).json({
        success: true,
    })

})


// Get all Reviews
exports.getAllProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return (next(new ErrorHandler("Product not found", 404)));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    // if reviews is 0 then show error that's why use this condition
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });

});





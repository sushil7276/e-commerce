const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, CreateProductReview, getAllProductReviews, deleteReview, getAdminProduct } = require("../controllers/productController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router()


router.route('/products').get(getAllProduct);

router.route("/admin/products").get(isAuthenticateUser, authorizeRoles("admin"), getAdminProduct);

router.route('/admin/product/new').post(isAuthenticateUser, authorizeRoles("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct)


router.route("/product/:id").get(getProductDetails);

// Reviews
router.route("/review").put(isAuthenticateUser, CreateProductReview)
router.route("/reviews").get(getAllProductReviews).delete(isAuthenticateUser, deleteReview)

module.exports = router;
const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticateUser } = require("../middleware/auth");

const router = express.Router()


router.route('/product').get(isAuthenticateUser, getAllProduct);
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);


module.exports = router;
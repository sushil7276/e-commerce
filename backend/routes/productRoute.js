const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router()


router.route('/product').get(getAllProduct);
router.route('/product/new').post(isAuthenticateUser, authorizeRoles("admin"), createProduct);

router.route('/product/:id')
    .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetails);


module.exports = router;
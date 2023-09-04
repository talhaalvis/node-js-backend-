const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../Controllers/ProductsController");
const { isAuthenticated, authorizeRole } = require("../MiddleWare/Auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticated, authorizeRole("admin"), createProduct);
router
  .route("/products/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRole("admin"), deleteProduct)
  .get(getProduct);
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  isUserAuthenticated,
  isUserPermitted,
} = require("../middleware/authentication");
const {
  createProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { upload } = require("../services/imageUploader");

router
  .route("/")
  .get(getAllProduct)
  .post(
    [isUserAuthenticated, isUserPermitted("vendor", "admin")],
    upload.single("image"),
    createProduct
  );
router
  .route("/:id")
  .get(getSingleProduct)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

module.exports = router;

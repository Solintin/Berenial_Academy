const express = require("express");
const router = express.Router();
const {
  isUserAuthenticated,
  isUserPermitted,
} = require("../middleware/authentication");
const {
  createCategory,
  getSingleCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { upload } = require("../services/imageUploader");

router
  .route("/")
  .get(getAllCategory)
  .post(
    [isUserAuthenticated, isUserPermitted("vendor", "admin")],
    createCategory
  );
router
  .route("/:id")
  .get(
    [isUserAuthenticated, isUserPermitted("vendor", "admin")],
    getSingleCategory
  )
  .put(
    [isUserAuthenticated, isUserPermitted("vendor", "admin")],
    updateCategory
  )
  .delete(
    [isUserAuthenticated, isUserPermitted("vendor", "admin")],
    deleteCategory
  );

module.exports = router;

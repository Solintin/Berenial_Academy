const { StatusCodes } = require("http-status-codes");
const { uploadProductImage } = require("./imageUploader");
const { response } = require("./response");

//Find specific Item by id from the database
const findById = async (res, model, id) => {
  const data = await model.findOne({ _id: id });
  if (!data) {
    return response(res, StatusCodes.NOT_FOUND, "Item not found");
  }
  return response(res, StatusCodes.OK, "Item retrieved successfully", data);
};

//Find all Items from the database
const findAll = async (res, model) => {
  const data = await model.find({});
  if (!data) {
    return response(res, StatusCodes.NOT_FOUND, "No Item not found");
  }
  return response(res, StatusCodes.OK, "Item retrieved successfully", data);
};

//Find one Items from the database and update
const findByIdAndUpdate = async (req, res, model, id) => {
  const data = await model.findOne({ _id: id });
  if (!data) {
    return response(res, StatusCodes.NOT_FOUND, "No Item not found");
  }
  //if the updated data contains image, then update as well
  if (req.file) {
    const uploadedImage = await uploadProductImage(req.file.path);
    req.body.image = uploadedImage;
  }
  const updatedItem = await model.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return response(
    res,
    StatusCodes.OK,
    "Item updated successfully",
    updatedItem
  );
};

const findByIdAndDelete = async (res, model, id) => {
  const data = await model.findByIdAndDelete({ _id: id });
  if (!data) {
    return response(res, StatusCodes.NOT_FOUND, "Item not found");
  }
  return response(res, StatusCodes.OK, "Item deleted successfully");
};

module.exports = { findById, findAll, findByIdAndUpdate, findByIdAndDelete };

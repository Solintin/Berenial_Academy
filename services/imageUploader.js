// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const uploadProductImage = async (path) => {
  let uploadedImage;

  try {
    uploadedImage = await cloudinary.uploader.upload(path, {
      useFileName: true,
      folder: "product_image",
    });
    return {
      public_id: uploadedImage.public_id,
      url: uploadedImage.url,
    };
  } catch (error) {
    console.log(error);
  }
};
const removeProductImage = async (public_id) => {
  await cloudinary.uploader.destroy(public_id, (error, result) => {
    // console.log(error);
    return result;
  });
};

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file) {
      throw new Error("Image is required");
    }

    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = { uploadProductImage, upload, removeProductImage };

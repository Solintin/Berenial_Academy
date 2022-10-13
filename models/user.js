const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const roles = ["admin", "user"];
const { idGenerator } = require("../utils");


const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email is required"],
      validate: {
        message: "Please provide a valid email address",
        validator: validator.isEmail,
      },
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    first_name: {
      type: String,
      require: [true, "firstname is required"],
    },
    last_name: {
      type: String,
      require: [true, "lastname is required"],
    },
    phone: {
      type: String,
      require: [true, "phone number is required"],
    },
    role: {
      type: String,
      required: ["Please provide a role"],
      enum: roles,
      default: "user",
    },
   
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedExpiration: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    passwordToken: {
      type: String,
    },
    passwordTokenExpiration: {
      type: Date,
    },
  },
  { timestamp: true }
);

idGenerator('user', userSchema)



userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("user", userSchema);

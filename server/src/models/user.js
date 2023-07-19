import mongoose, { Schema } from "mongoose";
import bcrypt from "brcypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    employeeID: {
      type: String,
      require: [true, "Require employee ID"],
      trim: true,
    },
    firstName: {
      type: String,
      require: [true, "Require first name"],
      trim: true,
    },
    lastName: {
      type: String,
      require: [true, "Require last name"],
      trim: true,
    },
    gender: {
      type: Boolean,
      require: true,
    },
    dateOfBirth: {
      type: Date,
      require: [true, "Require date of birth"],
      trim: true,
    },
    address: {
      type: String,
      require: [true, "Require address"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      require: [true, "Require phone number"],
      trim: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    email: {
      type: String,
      require: [true, "Require email"],
      trim: true,
      unique: true,
    },
    position: {
      type: String,
      enum: ["staff", "mamager", "director"],
      default: "staff",
    },
    password: {
      type: String,
      require: [true, "Require password"],
    },
    salary: {
      type: Number,
      require: [true, "Require salary"],
    },
    identification: {
      type: Number,
      require: [true, "Require identification"],
    },
    startDate: {
      type: Date,
      require: [true, "Require start date"],
    },
    contractSignDate: {
      type: Date,
      require: [true, "Require contract sign date"],
    },
    contractEndDate: {
      type: Date,
      require: [true, "Require contract end date"],
    },
  },
  { timestamps: true }
);

//Sử dụng bcrypt mã hoá mật khẩu
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

//Kiểm tra mật khẩu có khớp với mật khẩu đã được mã hoá hay không
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

//Xác nhận danh tính
userSchema.methods.signToken = async function () {
  const token = jwt.sign({ email: this.email }, process.env.PRIVATE_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE || "23h",
  });
};
//Kiểm tra email tồn tại
userSchema.statics.isEmailExited = async function (email) {
  const email = await this.findOne({ email });
  return !!email;
};

export const User = mongoose.model("User", userSchema);

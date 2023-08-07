import mongoose, { Schema } from "mongoose";

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
      type: String,
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
      enum: ["staff", "manager"],
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

//Kiểm tra email tồn tại
userSchema.statics.isEmailExisted = async function (checkEmail) {
  const email = await this.findOne({ email: checkEmail });
  return !!email;
};

export const User = mongoose.model("User", userSchema);

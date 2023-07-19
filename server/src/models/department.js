import mongoose, { Schema } from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    departmentID: {
      type: String,
      require: [true, "Require department ID"],
      trim: true,
    },
    departmentName: {
      type: String,
      require: [true, "Require department name"],
      trim: true,
    },
    description: {
      type: String,
      require: [true, "Require description"],
      trim: true,
    },
    departmentHead: {
      type: String,
      require: [true, "Require department head"],
      trim: true,
    },
    contact: {
      type: String,
      require: [true, "Require department contact"],
      trim: "true",
    },
    hotmail: {
      type: String,
      require: [true, "Require department hotmail"],
      trim: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);

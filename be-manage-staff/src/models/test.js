import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
      default: "Guest",
    },
  },
  { timestamps: true }
);

export const TestModel = mongoose.model("Test", testSchema);

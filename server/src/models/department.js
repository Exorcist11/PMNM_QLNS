import mongoose, { Schema } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Tạo một schema riêng để lưu giá trị counter cho việc tự động tăng `departmentID`
const departmentCounterSchema = new mongoose.Schema({
  seq: { type: Number, default: 0 },
});

// Sử dụng plugin AutoIncrement để tự động tăng `seq`
departmentCounterSchema.plugin(AutoIncrement, { inc_field: "seq" });

// Tạo model DepartmentCounter sử dụng departmentCounterSchema
export const DepartmentCounter = mongoose.model(
  "DepartmentCounter",
  departmentCounterSchema
);

const departmentSchema = new mongoose.Schema(
  {
    departmentID: {
      type: Number,
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
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Trước khi lưu một phòng ban mới, tự động tăng `departmentID` bằng cách sử dụng model DepartmentCounter
departmentSchema.pre("save", async function (next) {
  try {
    if (!this.departmentID) {
      const counter = await DepartmentCounter.findOneAndUpdate(
        {}, // Tìm document DepartmentCounter duy nhất (không cần id)
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Tùy chọn new: true để nhận được document sau khi tăng seq
      );

      this.departmentID = counter.seq;
    }

    next();
  } catch (error) {
    next(error);
  }
});

departmentSchema.virtual("userCount").get(function () {
  return this.users.length;
});

// Tạo model Department sử dụng departmentSchema
export const Department = mongoose.model("Department", departmentSchema);

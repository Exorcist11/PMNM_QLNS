// db.js

const mongoose = require("mongoose");

// Địa chỉ kết nối đến cơ sở dữ liệu MongoDB
const dbURI = "mongodb://127.0.0.1:27017/manage-staff";

// Thiết lập kết nối đến MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Các tùy chọn khác nếu cần thiết
    });
    console.log("Đã kết nối đến MongoDB");
  } catch (error) {
    console.error("Lỗi kết nối đến MongoDB:", error);
  }
};

module.exports = connectDB;

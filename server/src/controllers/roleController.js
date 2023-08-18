import { Department } from "../models/department";
import { User } from "../models/user";
import { Role } from "../models/role";

export const createNewRole = async (req, res) => {
  try {
    // Lấy dữ liệu từ client
    const { roleName, wage } = req.body;
    // Kiểm tra dữ liệu nhập
    if (!roleName || !wage) {
      return res.status(400).json({
        errCode: 1,
        errMsg: "Please enter all required information.",
      });
    }
    // Tạo một đối tượng phòng ban mới
    const newRole = new Role({
      roleName,
      wage,
    });

    // Lưu phòng ban vào cơ sở dữ liệu
    const savedRole = await newRole.save();

    return res.status(201).json({
      errCode: 0,
      errMsg: "Add role data successfully",
      data: savedRole,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from the server: " + error,
    });
  }
};

export const getAllRole = async (req, res) => {
  try {
    const roles = await Role.find();
    if (!roles) {
      return res.status(404).json({
        errCode: 2,
        errorMsg: "404 Not Found!",
      });
    } else {
      return res.status(200).json(roles);
    }
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from the server: " + error,
    });
  }
};

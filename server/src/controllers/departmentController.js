import { Department } from "../models/department";
import { User } from "../models/user";
import { Role } from "../models/role";
import mongoose from "mongoose";

// Lấy toàn bộ dữ liệu từ collection Department
export const getAllDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    if (!departments) {
      return res.status(404).json({
        errCode: 2,
        errorMsg: "404 Not Found!",
      });
    } else {
      return res.status(200).json(departments);
    }
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Lỗi kết nối: " + error,
    });
  }
};

export const getDepartmentByID = async (req, res) => {
  const deparmentID = req.params.id;
  try {
    const department = await Department.findById(deparmentID)
      .populate({
        path: "users",
        populate: { path: "position", select: "roleName" },
      })
      .exec();
    if (!department) {
      return res.status(404).json({
        errCode: 2,
        errorMsg: "404 Not Found!",
      });
    }
    return res.status(200).json({ listEmp: department });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Lỗi kết nối: " + error,
    });
  }
};

// Tạo mới 1 document department
export const createNewDepartment = async (req, res) => {
  try {
    // Lấy dữ liệu từ client
    const { departmentName, description, contact, hotmail, total } = req.body;
    // Kiểm tra dữ liệu nhập
    if (!departmentName || !description || !contact || !hotmail || !total) {
      return res.status(400).json({
        errCode: 1,
        errMsg: "Vui lòng nhập đầy đủ thông tin.",
      });
    }

    const isDept = await Department.findOne({ departmentName: departmentName });
    if (isDept) {
      return res.status(400).json({ errMsg: "Phòng ban đã tồn tại" });
    }

    // Tạo một đối tượng phòng ban mới
    const newDepartment = new Department({
      departmentName,
      description,
      contact,
      hotmail,
      total,
    });

    // Lưu phòng ban vào cơ sở dữ liệu
    const savedDepartment = await newDepartment.save();

    return res.status(201).json({
      errCode: 0,
      errMsg: "Thêm mới nhân viên thành công",
      data: savedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Lỗi kết nối: " + error,
    });
  }
};

// Cập nhật 1 document Deparment
export const updateDepartment = async (req, res) => {
  try {
    const { departmentID } = req.params;
    const updatedDepartmentData = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentID,
      updatedDepartmentData,
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ errMsg: "Không tìm thấy phòng ban" });
    }

    return res.json(updatedDepartment);
  } catch (error) {
    return res.status(500).json({ errMsg: "Lỗi kết nối " + error });
  }
};

// Xoá 1 document Department
export const deleteDepartment = async (req, res) => {
  try {
    // Lấy dữ liệu từ phía client
    const { departmentID } = req.params;
    // Thực hiện tìm kiếm departmentID và xoá nó ra khỏi collection
    const deleteDepartment = await Department.findOneAndDelete({
      departmentID,
    });

    if (!deleteDepartment) {
      return res.status(404).json({
        errCode: 2,
        errMsg: "Không tìm thấy phòng ban",
      });
    }
    await User.deleteMany({ department: deleteDepartment });
    return res.status(200).json({
      errCode: 0,
      errMsg: "Xoá phòng ban thành công",
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Lỗi kết nối: " + error,
    });
  }
};

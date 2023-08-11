import { User } from "../models/user";
import { Department } from "../models/department";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../models/role";

const generateEmployeeID = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getAllStaff = async (req, res) => {
  try {
    const user = await User.find().populate("department");

    if (!user) {
      return res.status(404).json({
        errCode: 2,
        errorMsg: "404 Not Found!",
      });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from server: " + error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (!email) {
      return res.status(404).json({
        errCode: 2,
        errMsg: "Wrong email!",
      });
    }
    const password = await bcrypt.compare(req.body.password, email.password);
    if (!password) {
      return res.status(404).json({
        errCode: 3,
        errMsg: "Wrong password!",
      });
    }
    if (email && password) {
      const accessToken = jwt.sign(
        {
          id: email.employeeID,
          position: email.position,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "30m" }
      );
      const { password, ...other } = email._doc;
      return res.status(200).json({
        errCode: 0,
        errMsg: "Success!",
        accessToken,
        data: other,
      });
    }
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from server: " + error,
    });
  }
};

export const creatStaff = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      address,
      phoneNumber,
      departmentID,
      email,
      roleID,
      password,
      salary,
      startDate,
      contractSignDate,
      contractEndDate,
    } = req.body;

    const emailExists = await User.isEmailExisted(email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const department = await Department.findById(departmentID);

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !address ||
      !phoneNumber ||
      !departmentID ||
      !email ||
      !password ||
      !salary ||
      !startDate ||
      !contractSignDate ||
      !contractEndDate ||
      !roleID
    ) {
      return res.status(400).json({
        errCode: 1,
        errMsg: "Please enter all required information.",
      });
    }
    // Generate a new unique employeeID
    let newEmployeeID = generateEmployeeID();
    // Check if the generated employeeID exists in the database, if yes, generate a new one until it's unique
    while (await User.exists({ employeeID: newEmployeeID })) {
      newEmployeeID = generateEmployeeID();
    }

    if (department.userCount > department.total) {
      return res.status(400).json({
        errCode: 2,
        errMsg: "More than the number of employees allowed",
      });
    }

    const newEmployee = new User({
      employeeID: newEmployeeID,
      firstName,
      lastName,
      dateOfBirth,
      address,
      phoneNumber,
      department: departmentID,
      email,
      position: roleID,
      password: hashed,
      salary,
      startDate,
      contractSignDate,
      contractEndDate,
    });

    const savedEmp = await newEmployee.save();
    const updateDepartment = await Department.findByIdAndUpdate(
      departmentID,
      { $push: { users: savedEmp._id } },
      { new: true }
    );
    const updateRole = await Role.findByIdAndUpdate(
      roleID,
      { $push: { users: savedEmp._id } },
      { new: true }
    );

    // Lưu nhân viên mới vào database

    return res.status(201).json({
      errCode: 0,
      errMsg: "Add Employee data successfully",
      emp: savedEmp,
      dept: updateDepartment,
      role: updateRole,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from server: " + error,
    });
  }
};

export const deleteEmployess = async (req, res) => {
  try {
    const employeeId = req.params.employeeID;

    // Tìm thông tin nhân viên để lấy departmentId
    const employee = await User.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Nhân viên không tồn tại." });
    }

    // Xoá nhân viên khỏi bảng users
    await User.findByIdAndRemove(employeeId);

    // Xoá nhân viên khỏi danh sách nhân viên của department
    await Department.findByIdAndUpdate(employee.department, {
      $pull: { users: employeeId },
    });

    res.status(200).json({ message: "Xoá nhân viên thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi xoá nhân viên." });
  }
};

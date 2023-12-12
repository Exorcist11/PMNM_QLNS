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
      errMsg: "Lỗi kết nối: " + error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email })
      .populate({
        path: "position",
        select: "roleName wage",
      })
      .populate({
        path: "department",
        select: "departmentName",
      });

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
        errMsg: "Sai mật khẩu!",
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
      errMsg: "Lỗi kết nối: " + error,
    });
  }
};

export const changePass = async (req, res) => {
  const { email, oldPass, newPass, confirmPass } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPass = await bcrypt.compare(oldPass, user.password);
    const salt = await bcrypt.genSalt(10);

    if (!isPass) {
      return res.status(401).json({ errMsg: "Mật khẩu cũ không đúng" });
    }
    if (newPass.length < 8) {
      return res.status(400).json({ errMsg: "Mật khẩu phải hơn 8 ký tự!" });
    }
    if (newPass !== confirmPass) {
      return res.status(401).json({ errMsg: "Mật khẩu mới không trùng" });
    }
    const hashedNewPass = await bcrypt.hash(newPass, salt);

    const updateResult = await User.updateOne(
      { email },
      { $set: { password: hashedNewPass } }
    );

    return res.status(200).json({ updateResult });
  } catch (error) {
    return res.status(500).json({ errMsg: "Lỗi kết nối: " + error });
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
      avatar,
    } = req.body;

    const emailExists = await User.isEmailExisted(email);
    if (emailExists) {
      return res.status(400).json({ errMsg: "Email đã tồn tại!" });
    }
    if (password.length < 8) {
      return res.status(400).json({ errMsg: "Mật khẩu phải hơn 8 ký tự!" });
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
        errMsg: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    // Calculate age based on date of birth
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    // Check if the employee is at least 18 years old
    if (age < 18) {
      return res.status(400).json({
        errCode: 2,
        errMsg: "Nhân viên chưa đủ tuổi ký hợp đồng lao động",
      });
    }

    // Check if contract end date is after contract sign date
    const signDate = new Date(contractSignDate);
    const endDate = new Date(contractEndDate);
    const startDateT = new Date(startDate);
    if (signDate >= endDate) {
      return res.status(400).json({
        errCode: 2,
        errMsg: "Ngày kết thúc hợp đồng phải lớn hơn ngày ký hợp đồng",
      });
    }

    if (startDateT >= endDate) {
      return res.status(400).json({
        errCode: 2,
        errMsg: "Ngày bắt đầu làm phải bé hơn ngày kết thúc hợp đồng",
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
        errMsg: "Vượt quá số lượng nhân viên cho phép",
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
      avatar,
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
      errMsg: "Thêm nhân viên thành công",
      emp: savedEmp,
      dept: updateDepartment,
      role: updateRole,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Lỗi kết nối: " + error,
    });
  }
};

export const deleteEmployess = async (req, res) => {
  try {
    const employeeId = req.params.employeeID;

    // Tìm thông tin nhân viên để lấy departmentId
    const employee = await User.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ errMsg: "Nhân viên không tồn tại." });
    }

    // Xoá nhân viên khỏi bảng users
    await User.findByIdAndRemove(employeeId);

    // Xoá nhân viên khỏi danh sách nhân viên của department
    await Department.findByIdAndUpdate(employee.department, {
      $pull: { users: employeeId },
    });

    res.status(200).json({ message: "Xoá nhân viên thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xoá nhân viên" });
  }
};

export const getEmpByID = async (req, res) => {
  const { empID } = req.params;
  try {
    const employee = await User.findById(empID)
      .populate({ path: "position", select: "roleName" })
      .populate({ path: "department", select: "departmentName" })
      .exec();

    return res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ errMsg: "Lỗi kết nối: " + error });
  }
};

export const updateEmp = async (req, res) => {
  try {
    const { empID } = req.params;
    const updatedEmp = req.body; // Dữ liệu mới từ request body
    const updated = await User.findByIdAndUpdate(empID, updatedEmp, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ errMsg: "Không tìm thấy nhân viên" });
    }

    return res.json({
      data: updated,
      errMsg: "Success",
    });
  } catch (error) {
    return res.status(500).json({ errMsg: "Lỗi kết nối: " + error });
  }
};

export const report = async (req, res) => {
  try {
    const employee = await User.find();
    const totalSalary = employee.reduce((total, employee) => {
      return total + employee.salary;
    }, 0);
    const countDepartment = await Department.count();
    const countEmployee = await User.count();

    const departments = await Department.find();
    const result = await Promise.all(
      departments.map(async (department) => {
        const high = await User.findOne({
          department: department._id,
        }).sort({ salary: -1 });

        return {
          departmentName: department.departmentName,
          highestEmp: {
            name: high === null ? "null" : high.firstName + " " + high.lastName,
            salary: high === null ? "null" : high.salary,
          },
        };
      })
    );
    return res.status(200).json({
      totalSalary,
      countDepartment,
      countEmployee,
      result,
    });
  } catch (error) {
    return res.status(500).json({ errMsg: "Lỗi kết nối: " + error });
  }
};

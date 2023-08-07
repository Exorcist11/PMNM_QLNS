import { Department } from "../models/department";

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
      errMsg: "Connection error from the server: " + error,
    });
  }
};

// Tạo mới 1 document department
export const createNewDepartment = async (req, res) => {
  try {
    // Lấy dữ liệu từ client
    const {
      departmentName,
      description,
      departmentHead,
      contact,
      hotmail,
      total,
    } = req.body;
    // Kiểm tra dữ liệu nhập
    if (
      !departmentName ||
      !departmentHead ||
      !description ||
      !contact ||
      !hotmail ||
      !total
    ) {
      return res.status(400).json({
        errCode: 1,
        errMsg: "Please enter all required information.",
      });
    }
    // Tạo một đối tượng phòng ban mới
    const newDepartment = new Department({
      departmentName,
      description,
      departmentHead,
      contact,
      hotmail,
      total,
    });

    // Lưu phòng ban vào cơ sở dữ liệu
    const savedDepartment = await newDepartment.save();

    return res.status(201).json({
      errCode: 0,
      errMsg: "added department data successfully",
      data: savedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from the server: " + error,
    });
  }
};

// Cập nhật 1 document Deparment
export const updateDepartment = async (req, res) => {
  try {
    // Lấy departmentID từ request parameters
    const { departmentID } = req.params;
    // Tìm kiếm và kiểm tra xem deparmentID có tồn tại hay không
    const department = await Department.findOne({ departmentID });
    if (!department) {
      return res.status(404).json({
        errCode: 2,
        errMsg: "Department not found!",
      });
    }
    // Lấy dữ liệu từ client
    const {
      departmentName,
      description,
      departmentHead,
      contact,
      hotmail,
      total,
    } = req.body;

    // Cập nhật dữ liệu vào Department
    department.departmentName = departmentName;
    department.description = description;
    department.departmentHead = departmentHead;
    department.contact = contact;
    department.hotmail = hotmail;
    department.total = total;

    // Lưu dữ liệu
    await department.save();

    return res.status(200).json({
      errCode: 0,
      errMsg: "Data update department successfully!",
      data: department,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from the server: " + error,
    });
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
        errMsg: "Department not found!",
      });
    }

    return res.status(200).json({
      errCode: 0,
      errMsg: "Delete department successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from the server: " + error,
    });
  }
};

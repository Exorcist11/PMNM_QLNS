import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateEmployeeID = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getAllStaff = async (req, res) => {
  res.send("DMC");
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
      gender,
      dateOfBirth,
      address,
      phoneNumber,
      department,
      email,
      position,
      password,
      salary,
      identification,
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

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !address ||
      !phoneNumber ||
      !department ||
      !email ||
      !position ||
      !password ||
      !salary ||
      !identification ||
      !startDate ||
      !contractSignDate ||
      !contractEndDate
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
    const newEmployee = new User({
      employeeID: newEmployeeID,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      address,
      phoneNumber,
      department,
      email,
      position,
      password: hashed,
      salary,
      identification,
      startDate,
      contractSignDate,
      contractEndDate,
    });

    // Lưu nhân viên mới vào database
    await newEmployee.save();

    return res.status(201).json({
      errCode: 0,
      errMsg: "Add Employee data successfully",
      data: newEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMsg: "Connection error from server: " + error,
    });
  }
};

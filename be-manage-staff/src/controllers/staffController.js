import { TestModel } from "../models/test";
export const createStaff = async (req, res) => {
  try {
    const search = await TestModel.find();
    console.log(search);
    res.status(200).json(search);
  } catch (err) {
    res.status(500).json(err);
  }
};

import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import cors from "cors";
require("dotenv").config();

const app = express();
const connectDB = require("./configs/connectDB");

//comfig app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

viewEngine(app);
initWebRoutes(app);

//Kết nối cơ sở dữ liệu
connectDB();

const port = process.env.PORT || 2077;
app.listen(port, () => {
  console.log("NodeJS is running on port:", port);
});

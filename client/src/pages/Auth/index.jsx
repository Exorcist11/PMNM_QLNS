import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [reg, setReg] = useState({
    email: "",
    password: "",
  });

  const [errLogin, setErrorLogin] = useState("");
  const [errPass, setErrorPass] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReg((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const login = () => {
    axios
      .post("http://localhost:3002/manage-staff/login", reg)
      .then((response) => {
        const user = JSON.stringify(response.data.data);
        localStorage.setItem("account", user);
        navigate("/");
      })
      .catch((error) => {
        const { errMsg, errCode } = error.response.data;
        if (errCode === 2) {
          setErrorLogin(errMsg);
        } else if (errCode === 3) {
          setErrorPass(errMsg);
        }
        throw ("Lỗi khi thêm mới:", error.response);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#88aaf0",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fafafa",
          width: "60%",
          height: "60vh",
          borderRadius: "20px",
          display: "flex",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2053ff",
            width: "40%",
            height: "60vh",
            borderRadius: "20px 0px 0px 20px",
            textTransform: "uppercase",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "45px",
            padding: "0px 20px",
          }}
        >
          Hệ thống quản lý nhân viên
        </Box>

        <Box
          sx={{
            padding: "0 15px",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box>
            <h1>Welcome!</h1>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginBottom: "20px",
            }}
          >
            <TextField
              error={Boolean(errLogin)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ width: "100%" }}
              name="email"
              onChange={handleChange}
              helperText={errLogin ? errLogin : ""}
            />
            <TextField
              id="outlined-basic"
              label="Mật khẩu"
              variant="outlined"
              name="password"
              sx={{ width: "100%" }}
              type="password"
              onChange={handleChange}
              helperText={errPass ? errPass : ""}
              error={Boolean(errPass)}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" disableElevation onClick={login}>
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

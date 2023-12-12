import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChangePass() {
  const account = JSON.parse(localStorage.getItem("account"));
  //console.log(account);
  const [pass, setPass] = useState({
    email: account.email,
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });
  const navigate = useNavigate();
  const backToMenu = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPass((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  //console.log(pass);
  const changePassword = () => {
    axios
      .post("http://localhost:3002/manage-staff/change-password", pass)
      .then(() => {
        toast.success("Cập nhật mật khẩu thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
        localStorage.clear();
      })
      .catch((error) => {
        toast.error("Lỗi: " + error.response.data.errMsg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        throw ("Lỗi khi thêm mới:", error.response.data.errMsg);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <h1>Đổi mật khẩu</h1>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "250px" }}>Nhập mật khẩu cũ </Box>
        <TextField
          id="outlined-basic"
          label="Mật khẩu cũ"
          variant="outlined"
          name="oldPass"
          onChange={handleChange}
          type="password"
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "250px" }}>Nhập mật khẩu mới </Box>
        <TextField
          id="outlined-basic"
          label="Mật khẩu mới"
          variant="outlined"
          name="newPass"
          onChange={handleChange}
          type="password"
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "250px" }}>Xác nhận mật khẩu mới </Box>
        <TextField
          id="outlined-basic"
          label="Xác nhận"
          variant="outlined"
          name="confirmPass"
          onChange={handleChange}
          type="password"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={backToMenu}>
          Quay về
        </Button>
        <Button variant="contained" onClick={changePassword}>
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
}

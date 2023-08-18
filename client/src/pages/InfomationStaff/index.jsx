import { Box, Container, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DatePick from "~/components/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import CustomButton from "../InfomationSalary";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function InformationStaff() {
  const account = JSON.parse(localStorage.getItem("account"));
  const [data, setData] = useState({
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios
      .get(`http://localhost:3002/manage-staff/getEmpByID/${account._id}`)
      .then((response) => {
        // Lưu trữ dữ liệu từ API vào state
        setData(response.data);
      })
      .catch((error) => {
        throw ("Error fetching data:", error);
      });
  }, [account._id]);

  const [selectTime, setSelectTime] = useState(data.dateOfBirth);
  const handleSelectTime = (event) => {
    setSelectTime(event.$y + "-" + (event.$M + 1) + "-" + event.$D);
  };
  // eslint-disable-next-line no-undef
  const formattedDate = moment(account.contractSignDate)
    .utc()
    .format("DD/MM/YYYY");
  const saveChange = () => {
    const update = {
      dateOfBirth: selectTime,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };
    axios
      .put(
        `http://localhost:3002/manage-staff/updateEmpByID/${account._id}`,
        update
      )
      .then((response) => {
        setData(response.data);
        toast.success("Cập nhật thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        throw error;
      });
  };
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h3" gutterBottom>
          Thông tin cá nhân
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ecedef",
            borderRadius: "10px",
            padding: "0px 20px",
            boxShadow: "3px 3px 3px #aaaaaa",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ marginTop: "10px" }}>
            Thông tin cơ bản
          </Typography>

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Mã nhân viên
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
              {account.employeeID}
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Họ tên
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
              {account.firstName + " " + account.lastName}
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Ngày sinh
            </Typography>
            <DatePick
              value={dayjs(data.dateOfBirth)}
              datePick={handleSelectTime}
              variant={"standard"}
            />
          </Box>
          <Divider />

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Phòng ban
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
              {account.department.departmentName}
            </Typography>
          </Box>
          <Divider />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ecedef",
            borderRadius: "10px",
            padding: "0px 20px",
            boxShadow: "3px 3px 3px #aaaaaa",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ marginTop: "10px" }}>
            Thông tin liên hệ
          </Typography>

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Email
            </Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              value={data.email}
              sx={{ width: "373px" }}
              onChange={handleFieldChange}
              name="email"
            />
          </Box>
          <Divider />

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Số điện thoại
            </Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              value={data.phoneNumber}
              sx={{ width: "373px" }}
              onChange={handleFieldChange}
              name="phoneNumber"
            />
          </Box>
          <Divider />

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Địa chỉ
            </Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              value={data.address}
              sx={{ width: "373px" }}
              onChange={handleFieldChange}
              name="address"
            />
          </Box>
          <Divider />

          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
              Ngày ký hợp đồng
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ width: "200px", fontSize: "15px" }}
            >
              {formattedDate}
            </Typography>
          </Box>
          <Divider />

          <Divider />
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={() => saveChange()}>
          Thay đổi
        </Button>
        <CustomButton nameBtn={"Xem lương"} />
        {/* <Button variant="contained">Xem lương</Button> */}
      </Box>
    </Container>
  );
}

import { Box } from "@mui/material";
import DepartmentDialog from "~/components/Popup/departmentPop";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import axios from "axios";
import { useEffect, useState } from "react";
import FirstComponent from "~/components/DatePicker";
import SelectSmall from "~/components/Selected";
import { toast } from "react-toastify";
import ErrorIcon from "@mui/icons-material/Error";

export default function ManageStaff() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng hàng hiển thị trên mỗi trang
  const [data, setData] = useState([]);

  // Tính toán số lượng trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm xử lý khi người dùng thay đổi trang
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios
      .get(`http://localhost:3002/manage-staff/getAllStaff`)
      .then((response) => {
        // Lưu trữ dữ liệu từ API vào state
        setData(response.data);
      })
      .catch((error) => {
        throw ("Error fetching data:", error);
      });
  }, []);

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setEmp((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const [selectedDept, setSelectedDept] = useState("");
  const handleSelectChange = (newValue) => {
    setSelectedDept(newValue);
  };
  const [selectedRole, setSelectedRole] = useState("");
  const handleSelectRole = (newValue) => {
    setSelectedRole(newValue);
  };
  const [signD, setSignD] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endD, setEndD] = useState(null);
  const [born, setBorn] = useState(null);

  const [emp, setEmp] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    departmentID: "",
    email: "",
    password: "",
    salary: "",
    startDate: "",
    contractSignDate: "",
    contractEndDate: "",
    roleID: "",
  });

  const handleSave = async () => {
    const update = {
      ...emp,
      contractSignDate: signD,
      dateOfBirth: born,
      contractEndDate: endD,
      startDate: startDate,
      departmentID: selectedDept,
      roleID: selectedRole,
    };

    axios
      .post("http://localhost:3002/manage-staff/createNewEmp", update)
      .then((response) => {
        setData((prevData) => [...prevData, response.data.emp]);
        toast.success("Đã lưu nhân viên thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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

  const handleCancel = () => {};
  const handlePick = (news) => {
    setStartDate(news.$y + "-" + (news.$M + 1) + "-" + news.$D);
  };

  const signDate = (news) => {
    setSignD(news.$y + "-" + (news.$M + 1) + "-" + news.$D);
  };

  const endDate = (news) => {
    setEndD(news.$y + "-" + (news.$M + 1) + "-" + news.$D);
  };

  const dateOfBirth = (news) => {
    setBorn(news.$y + "-" + (news.$M + 1) + "-" + news.$D);
  };
  const dialogContentDel = {
    title: "Xoá nhân viên",
    actionSave: true,
    nameBtn: "Xác nhận",
    content: (
      <Box sx={{ display: "flex", gap: 2 }}>
        <ErrorIcon color="error" />
        Dữ liệu sau khi xoá không thể khôi phục. Bạn chắc chứ!
      </Box>
    ),
  };

  const handleDel = (empID) => {
    axios
      .delete(`http://localhost:3002/manage-staff/${empID}`)
      .then(() => {
        // If the employee is successfully deleted, update the table by removing the employee from the data state
        setData((prevData) => prevData.filter((item) => item._id !== empID));

        // Show success toast
        toast.success("Nhân viên đã được xoá thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        // Show error toast
        toast.error("Có lỗi xảy ra khi xoá nhân viên. Vui lòng thử lại sau!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        throw ("Lỗi khi xoá nhân viên:", error);
      });
  };
  const dialogContent = {
    title: "Thêm mới nhân viên",
    actionSave: true,
    nameBtn: "Save",
    content: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              id="outlined-error"
              label="Họ"
              onChange={handleOnchange}
              fullWidth
              name="firstName"
            />
            <TextField
              id="outlined-error"
              label="Tên"
              onChange={handleOnchange}
              fullWidth
              name="lastName"
            />
            <TextField
              id="outlined-error"
              label="Lương cứng"
              onChange={handleOnchange}
              fullWidth
              name="salary"
            />
          </Box>

          <Box
            sx={{
              width: "70%",
              display: "flex",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, width: "95%" }}>
              <TextField
                id="outlined-error"
                label="Email"
                onChange={handleOnchange}
                fullWidth
                name="email"
              />
              <TextField
                id="outlined-error"
                label="Mật khẩu"
                onChange={handleOnchange}
                fullWidth
                name="password"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, width: "95%" }}>
              <TextField
                id="outlined-error"
                label="Địa chỉ"
                onChange={handleOnchange}
                fullWidth
                name="address"
              />

              <TextField
                id="outlined-error"
                label="Số điện thoại"
                onChange={handleOnchange}
                fullWidth
                name="phoneNumber"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2.5 }}>
              <SelectSmall
                name="Phòng ban"
                onChangeVar={handleSelectChange}
                apiURL="http://localhost:3002/departments/getAllDepartment"
                titleV="departmentName"
              />

              <SelectSmall
                name="Vị trí"
                onChangeVar={handleSelectRole}
                apiURL="http://localhost:3002/roles/getAllRole"
                titleV="roleName"
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2.5 }}>
              <FirstComponent label="Ngày ký hợp đồng" datePick={signDate} />
              <FirstComponent
                label="Ngày kết thúc hợp đồng"
                datePick={endDate}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2.5 }}>
              <FirstComponent
                label="Ngày bắt đầy làm việc"
                datePick={handlePick}
              />
              <Box>
                <FirstComponent label="Ngày sinh" datePick={dateOfBirth} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex" }}>
        <DepartmentDialog
          dialogContent={dialogContent} // Truyền nội dung vào DepartmentDialog
          buttonText={"Thêm mới nhân viên"}
          icon={<AddIcon />}
          varI={"outlined"}
          mWidth={"lg"}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Box>

      <Box>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>STT</th>
              <th style={tableHeaderStyle}>Họ tên</th>
              <th style={tableHeaderStyle}>Số điện thoại</th>
              <th style={tableHeaderStyle}>Email </th>
              <th style={tableHeaderStyle}>Phòng ban</th>
              <th style={tableHeaderStyle}>Lương</th>
              <th style={tableHeaderStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((item, index) => (
                <tr key={item._id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>
                    {item.firstName + " " + item.lastName}
                  </td>
                  <td style={tableCellStyle}>{item.phoneNumber}</td>
                  <td style={tableCellStyle}>{item.email}</td>
                  <td style={tableCellStyle}>{item.department.departmentName}</td>
                  <td style={tableCellStyle}>{item.salary}</td>
                  <td style={tableCellStyle}>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      <Box>
                        <DepartmentDialog
                          dialogContent={dialogContent} // Truyền nội dung vào DepartmentDialog
                          buttonText={"Sửa"}
                          icon={<EditIcon />}
                          varI={"outlined"}
                          mWidth={"lg"}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      </Box>
                      <Box>
                        <DepartmentDialog
                          dialogContent={dialogContentDel} // Truyền nội dung vào DepartmentDialog
                          buttonText={"Xoá"}
                          icon={<DeleteIcon />}
                          varI={"outlined"}
                          mWidth={"lg"}
                          onSave={() => handleDel(item._id)}
                          onCancel={handleCancel}
                        />
                      </Box>
                    </Box>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ "&:hover": { color: "green" } }}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <SkipPreviousIcon titleAccess="Previous" />
          </IconButton>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              style={
                currentPage === index + 1
                  ? activePaginationButtonStyle
                  : paginationButtonStyle
              }
            >
              {index + 1}
            </button>
          ))}
          <IconButton
            sx={{ "&:hover": { color: "green" } }}
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            <SkipNextIcon titleAccess="Next" />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}
// CSS cho tiêu đề cột
const tableHeaderStyle = {
  backgroundColor: "#1e7fff",
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  borderRight: "1px solid #ddd",
  color: "white",
};

// CSS cho hàng
const tableRowStyle = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
};

// CSS cho ô dữ liệu
const tableCellStyle = {
  padding: "8px",
  textAlign: "left",
  border: "1px solid #ddd", // Viền cho cột
};
const paginationButtonStyle = {
  margin: "5px",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "none",
};

const activePaginationButtonStyle = {
  margin: "5px",
  padding: "5px 10px",
  cursor: "pointer",
  backgroundColor: "#1e7fff",
  borderRadius: "50%",
  color: "white",
  border: "none",
};

// Tạo một component riêng để hiển thị danh sách nhân viên của phòng ban
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";

const EmployeeList = () => {
  const [department, setDepartment] = useState([]);
  const [listUser, setListUser] = useState([]);
  const id = localStorage.getItem("deptID");
  useEffect(() => {
    // Gọi API để lấy danh sách nhân viên của phòng ban dựa trên departmentID
    axios
      .get(`http://localhost:3002/departments/${id}`)
      .then((response) => {
        setDepartment(response.data.listEmp);
        setListUser(response.data.listEmp.users);
      })
      .catch((error) => {
        throw ("Error fetching employee data:", error);
      });
  }, [id]);

  return (
    <div>
      <h2>{department.departmentName}</h2>
      <span>{department.description}</span>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>STT</th>
            <th style={tableHeaderStyle}>Họ tên</th>
            <th style={tableHeaderStyle}>SĐT</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Vị trí</th>
            <th style={tableHeaderStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((item, index) => (
              <tr key={item._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>
                  {item.firstName + " " + item.lastName}
                </td>

                <td style={tableCellStyle}>{item.phoneNumber}</td>
                <td style={tableCellStyle}>{item.email}</td>
                <td style={tableCellStyle}>{item.position.roleName}</td>
                <td style={tableCellStyle}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <Box>
                      {/* <DepartmentDialog
                      dialogContent={dialogContentUpdate}
                      icon={<EditIcon />}
                      onSave={() => handleUpdate(item.departmentID)}
                      onCancel={handleCancel}
                      buttonText={"sửa"}
                      varI={"contained"}
                      color="success"
                    /> */}
                    </Box>
                    <Box>
                      {/* <DepartmentDialog
                      dialogContent={dialogContentDel} // Truyền nội dung vào DepartmentDialog
                      icon={<DeleteIcon />}
                      onSave={() => handleDelete(item.departmentID)}
                      onCancel={handleCancel}
                      buttonText={"xoá"}
                      varI={"contained"}
                      color="primary"
                    /> */}
                    </Box>
                  </Box>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
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
// const paginationButtonStyle = {
//   margin: "5px",
//   padding: "5px 10px",
//   cursor: "pointer",
//   borderRadius: "50%",
//   border: "none",
// };

// const activePaginationButtonStyle = {
//   margin: "5px",
//   padding: "5px 10px",
//   cursor: "pointer",
//   backgroundColor: "#1e7fff",
//   borderRadius: "50%",
//   color: "white",
//   border: "none",
// };

export default EmployeeList;

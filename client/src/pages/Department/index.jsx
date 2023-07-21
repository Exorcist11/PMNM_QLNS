/* eslint-disable no-console */
import { Box, Button } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";

const DataGridFromApi = () => {
  const columns = [
    { field: "departmentID", headerName: "ID", width: 90 },
    { field: "departmentName", headerName: "Department Name", flex: 1 },
    { field: "departmentHead", headerName: "Trưởng phòng", flex: 1 },
    { field: "contact", headerName: "Hotel", flex: 1 },
    { field: "hotmail", headerName: "Email", flex: 1 },
    { field: "total", headerName: "Tổng nhân viên", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: () => (
        <>
          {/* Icon Sửa */}
          <Edit aria-label="Sửa" onClick={() => handleEdit()}>
            <Edit />
          </Edit>

          {/* Icon Xoá */}
          <Delete aria-label="Xoá" onClick={() => handleDelete()}>
            <Delete />
          </Delete>
        </>
      ),
    },
  ];
  const handleEdit = (id) => {
    // Xử lý hành động chỉnh sửa cho hàng có ID tương ứng
    console.log("Chỉnh sửa hàng với ID:", id);
    // Thực hiện các thao tác cần thiết khi chỉnh sửa hàng
  };
  const handleDelete = (id) => {
    // Xử lý hành động chỉnh sửa cho hàng có ID tương ứng
    console.log("Chỉnh sửa hàng với ID:", id);
    // Thực hiện các thao tác cần thiết khi chỉnh sửa hàng
  };
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch dữ liệu từ API khi component được tạo lần đầu tiên
    axios
      .get("http://localhost:3002/departments/getAllDepartment")
      .then((response) => {
        // Chỉnh sửa dữ liệu trước khi đưa vào DataGrid
        const apiDataWithId = response.data.data.map((row) => {
          return { ...row, id: row.departmentID }; // Sử dụng thuộc tính departmentID làm id của mỗi hàng
        });
        setApiData(apiDataWithId);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu từ API:", error);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={apiData}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Box>
  );
};

export default function Department() {
  return (
    <Box>
      <Box>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Thêm mới phòng ban
        </Button>
      </Box>
      <Box>
        <DataGridFromApi />
      </Box>
    </Box>
  );
}

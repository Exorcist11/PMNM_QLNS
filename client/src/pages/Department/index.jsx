import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DepartmentDialog from "~/components/Popup/departmentPop";
import ErrorIcon from "@mui/icons-material/Error";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import Paging from "~/components/Paging";

export default function Department() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng hàng hiển thị trên mỗi trang
  const [searchKeyword, setSearchKeyword] = useState(""); // Lưu biến tìm kiếm

  // Tính toán số lượng trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const [error, setError] = useState(null);
  const [dept, setDept] = useState({
    departmentName: "",
    description: "",
    departmentHead: "",
    contact: "",
    hotmail: "",
    total: "",
  });
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios
      .get("http://localhost:3002/departments/getAllDepartment")
      .then((response) => {
        // Lưu trữ dữ liệu từ API vào state
        setData(response.data);
      })
      .catch((error) => {
        throw ("Error fetching data:", error);
      });
  }, []);

  const navigate = useNavigate();
  const handleNameClick = (id) => {
    localStorage.setItem("deptID", id);
    navigate("/emp-list");
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  const search = () => {
    alert(searchKeyword);
  };
  // Hàm xử lý khi người dùng thay đổi trang
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setDept((preState) => ({
      ...preState,
      [name]: value,
    }));
    setSelectedDepartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Thêm
  const dialogContent = {
    title: "Thêm mới phòng ban",
    actionSave: true,
    nameBtn: "Save",
    content: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="outlined-error"
          label="Tên phòng ban"
          onChange={handleOnchange}
          fullWidth
          name="departmentName"
        />
        <TextField
          id="outlined-error"
          label="Hotmail"
          onChange={handleOnchange}
          fullWidth
          name="hotmail"
        />
        <TextField
          id="outlined-error"
          label="Hotel"
          onChange={handleOnchange}
          fullWidth
          name="contact"
        />
        <TextField
          id="outlined-error"
          label="Số lượng nhân viên"
          onChange={handleOnchange}
          fullWidth
          name="total"
        />
        <TextField
          id="outlined-error"
          label="Mô tả"
          onChange={handleOnchange}
          fullWidth
          name="description"
          helperText={error ? error : ""}
        />
      </Box>
    ),
  };

  const handleSave = () => {
    axios
      .post("http://localhost:3002/departments/createNewDepartment", dept)
      .then((response) => {
        // If the new department is successfully created, update the table
        setData((prevData) => [...prevData, response.data.data]);
        toast.success("Đã lưu phòng ban thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setDept({
          departmentName: "",
          description: "",
          contact: "",
          hotmail: "",
          total: "",
        });
      })
      .catch((error) => {
        setError(error.response.data.errMsg);
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

  const handleCancel = () => {
    setDept({
      departmentName: "",
      description: "",
      contact: "",
      hotmail: "",
      total: "",
    });
  };

  // Xoá
  const dialogContentDel = {
    title: "Xoá phòng ban",
    actionSave: true,
    nameBtn: "Xác nhận",
    content: (
      <Box sx={{ display: "flex", gap: 2 }}>
        <ErrorIcon color="error" />
        Dữ liệu sau khi xoá không thể khôi phục. Bạn chắc chứ!
      </Box>
    ),
  };
  const handleDelete = (departmentID) => {
    axios
      .delete(`http://localhost:3002/departments/${departmentID}`)
      .then(() => {
        // If the employee is successfully deleted, update the table by removing the employee from the data state
        setData((prevData) =>
          prevData.filter((item) => item.departmentID !== departmentID)
        );

        // Show success toast
        toast.success("Phòng ban đã được xoá thành công!", {
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
        toast.error("Có lỗi xảy ra khi xoá phòng ban. Vui lòng thử lại sau!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        throw ("Lỗi khi xoá phòng ban:", error);
      });
  };

  // Sửa
  const dialogContentUpdate = {
    title: "Cập nhật phòng ban",
    actionSave: true,
    nameBtn: "Cập nhật",
    content: (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="outlined-error"
          label="Tên phòng ban"
          onChange={handleOnchange}
          fullWidth
          name="departmentName"
          value={selectedDepartment?.departmentName || ""}
        />

        <TextField
          id="outlined-error"
          label="Hotmail"
          onChange={handleOnchange}
          fullWidth
          name="hotmail"
          value={selectedDepartment?.hotmail || ""}
        />
        <TextField
          id="outlined-error"
          label="Hotel"
          onChange={handleOnchange}
          fullWidth
          name="contact"
          value={selectedDepartment?.contact || ""}
        />
        <TextField
          id="outlined-error"
          label="Số lượng nhân viên"
          onChange={handleOnchange}
          fullWidth
          name="total"
          value={selectedDepartment?.total || ""}
        />
        <TextField
          id="outlined-error"
          label="Mô tả"
          onChange={handleOnchange}
          fullWidth
          name="description"
          value={selectedDepartment?.description || ""}
          helperText={error ? error : ""}
        />
      </Box>
    ),
  };

  const handleSelectDeptByID = (id) => {
    axios
      .get(`http://localhost:3002/departments/${id}`)
      .then((response) => {
        setSelectedDepartment(response.data.listEmp);
      })
      .catch((error) => {
        throw ("Lỗi khi cập nhật phòng ban:", error);
      });
  };

  const handleUpdate = (departmentID) => {
    const updatedData = {
      departmentName: selectedDepartment.departmentName,
      hotmail: selectedDepartment.hotmail,
      contact: selectedDepartment.contact,
      total: selectedDepartment.total,
      description: selectedDepartment.description,
    };
    axios
      .put(`http://localhost:3002/departments/${departmentID}`, updatedData)
      .then((response) => {
        // If the department is successfully updated, update the table by finding the updated department in the data state and replacing it
        setData((prevData) =>
          prevData.map((item) =>
            item.departmentID === departmentID ? response.data.data : item
          )
        );
        // Show success toast
        toast.success("Phòng ban đã được cập nhật thành công!", {
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
        // Show error toast
        toast.error(
          "Có lỗi xảy ra khi cập nhật phòng ban. Vui lòng thử lại sau!",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

        throw ("Lỗi khi cập nhật phòng ban:", error);
      });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <DepartmentDialog
          dialogContent={dialogContent} // Truyền nội dung vào DepartmentDialog
          buttonText={"Thêm mới"}
          icon={<AddIcon />}
          varI={"outlined"}
          mWidth={"lg"}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <SearchIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            onClick={search}
          />
          <TextField
            id="input-with-sx"
            label="Tìm kiếm"
            variant="standard"
            onChange={handleSearch}
          />
        </Box>
      </Box>
      {/* Hiển thị dữ liệu */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Tên phòng</th>
            <th style={tableHeaderStyle}>Liên hệ</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Số lượng </th>
            <th style={tableHeaderStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.departmentID} style={tableRowStyle}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td
                style={tableCellStyle}
                onClick={() => handleNameClick(item._id)}
              >
                {item.departmentName}
              </td>

              <td style={tableCellStyle}>{item.contact}</td>
              <td style={tableCellStyle}>{item.hotmail}</td>
              <td style={tableCellStyle}>{item.total}</td>
              <td style={tableCellStyle}>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <Box>
                    <DepartmentDialog
                      dialogContent={dialogContentUpdate}
                      icon={<EditIcon />}
                      onSave={() => handleUpdate(item._id)}
                      onCancel={handleCancel}
                      buttonText={"sửa"}
                      varI={"contained"}
                      color="success"
                      selectID={() => handleSelectDeptByID(item._id)}
                    />
                  </Box>
                  <Box>
                    <DepartmentDialog
                      dialogContent={dialogContentDel} // Truyền nội dung vào DepartmentDialog
                      icon={<DeleteIcon />}
                      onSave={() => handleDelete(item.departmentID)}
                      onCancel={handleCancel}
                      buttonText={"xoá"}
                      varI={"contained"}
                      color="primary"
                    />
                  </Box>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
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
      {/* <Paging data={data} itemsPerPage={10} /> */}
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

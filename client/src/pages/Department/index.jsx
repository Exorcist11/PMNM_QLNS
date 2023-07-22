import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Department() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng hàng hiển thị trên mỗi trang

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios
      .get("http://localhost:3002/departments/getAllDepartment")
      .then((response) => {
        // Lưu trữ dữ liệu từ API vào state
        setData(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleNameClick = (name) => {
    alert(`You clicked on ${name}`);
  };
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
  return (
    <Box>
      <h1>Data Table</h1>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Tên phòng</th>
            <th style={tableHeaderStyle}>Trưởng phòng</th>
            <th style={tableHeaderStyle}>Liên hệ</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Số lượng </th>
            <th style={tableHeaderStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.departmentID} style={tableRowStyle}>
              <td style={tableCellStyle}>{item.departmentID}</td>
              <td
                style={tableCellStyle}
                onClick={() => handleNameClick(item.departmentName)}
              >
                {item.departmentName}
              </td>
              <td style={tableCellStyle}>{item.departmentHead}</td>
              <td style={tableCellStyle}>{item.contact}</td>
              <td style={tableCellStyle}>{item.hotmail}</td>
              <td style={tableCellStyle}>{item.total}</td>
              <td style={tableCellStyle}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box>
                    <IconButton aria-label="fingerprint" color="success">
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton aria-label="fingerprint" color="success">
                      <DeleteIcon />
                    </IconButton>
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

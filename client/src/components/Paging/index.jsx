import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Paging(props) {
  const { data, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Hàm xử lý khi người dùng thay đổi trang
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
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
  );
}
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

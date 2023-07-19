import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  let [data, setData] = useState([]);
  useEffect(() => {
    // Gửi yêu cầu GET đến máy chủ Node.js để lấy dữ liệu từ API
    axios
      .get("http://localhost:3002/manage-staff/staff/get-staff")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Box>
      Home
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </Box>
  );
}

import { Box, Divider } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
export default function Report() {
  const [report, setReport] = useState([]);
  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios
      .get(`http://localhost:3002/manage-staff/report`)
      .then((response) => {
        // Lưu trữ dữ liệu từ API vào state
        setReport(response.data);
      })
      .catch((error) => {
        throw ("Error fetching data:", error);
      });
  }, []);

  const Number = ({ n }) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 0.3, tension: 200, friction: 10 },
    });

    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        <h1>Dashboard</h1>
      </Box>
      <Box sx={{ display: "flex", alignContent: "space-between", gap: 6 }}>
        <Box
          sx={{
            background: "linear-gradient(to bottom, #0052d4, #4364f7, #6fb1fc)",
            height: "120px",
            width: "100%",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "20px",
              color: "#f6f5ff",
              margin: "0",
            }}
          >
            <GroupsIcon fontSize="large" />
            <span>Số lượng nhân viên</span>
          </Box>
          <Box sx={{ fontSize: "40px" }}>
            <Number n={report.countEmployee} />
          </Box>
        </Box>

        <Box
          sx={{
            background: "linear-gradient(to top, #7474bf, #348ac7);",
            height: "120px",
            width: "100%",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "20px",
              color: "#f6f5ff",
            }}
          >
            <BusinessIcon fontSize="large" />
            <span>Số lượng phòng ban</span>
          </Box>
          <Box sx={{ fontSize: "40px" }}>
            <Number n={report.countDepartment} />
          </Box>
        </Box>
        <Box
          sx={{
            background: "linear-gradient(to bottom, #00d2ff, #3a7bd5)",
            height: "120px",
            width: "100%",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "20px",
              color: "#f6f5ff",
            }}
          >
            <AttachMoneyIcon fontSize="large" />
            <span>Tổng lương</span>
          </Box>
          <Box sx={{ fontSize: "40px" }}>
            <Number n={report.totalSalary} />
          </Box>
        </Box>
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
        <h3>Nhân viên có lương cao nhất</h3>
        <Divider />
        {report &&
          report.result &&
          report.result.map((departmentInfo) => (
            <Box key={departmentInfo.departmentName}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ width: "40%" }}>
                  <h4>{departmentInfo.highestEmp.name}</h4>
                </Box>
                <Box
                  sx={{ width: "40%", display: "flex", alignItems: "center" }}
                >
                  {departmentInfo.departmentName}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {departmentInfo.highestEmp.salary}
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

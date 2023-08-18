import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from "@mui/icons-material/Info";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Navbar() {
  // Get the current location from React Router
  const location = useLocation();

  // Define the routes and their corresponding index for the Tabs
  const routes = [
    "/",
    "/staff-manage",
    "/department",
    "/infomation-staff",
    "/report",
  ];
  const currentRouteIndex = routes.indexOf(location.pathname);

  // Set the state value to the currentRouteIndex
  const [value, setValue] = useState(currentRouteIndex);

  useEffect(() => {
    // Update the value when the location changes
    setValue(currentRouteIndex);
  }, [currentRouteIndex]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const account = JSON.parse(localStorage.getItem("account"));
  const role = account.position.roleName;

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", height: "100vh" }}
        >
          <Tab
            label="Trang chủ"
            component={Link}
            to={"/"}
            icon={<HomeIcon />}
            iconPosition="start"
          />
          <Tab
            label="Quản lý nhân viên"
            component={Link}
            to={"/staff-manage"}
            icon={<PersonIcon />}
            iconPosition="start"
            sx={{ display: role === "Employee" ? "none" : "" }}
          />
          <Tab
            label="Quản lý phòng ban"
            component={Link}
            to={"/department"}
            icon={<GroupsIcon />}
            iconPosition="start"
            sx={{ display: role === "Employee" ? "none" : "" }}
          />
          <Tab
            label="Thông tin cá nhân"
            component={Link}
            to={"/infomation-staff"}
            icon={<InfoIcon />}
            iconPosition="start"
          />
          <Tab
            label="Thống kê"
            component={Link}
            to={"/report"}
            icon={<BarChartIcon />}
            iconPosition="start"
            sx={{ display: role === "Employee" ? "none" : "" }}
          />
        </Tabs>
      </Box>
    </Box>
  );
}

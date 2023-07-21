import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          />
          <Tab
            label="Quản lý phòng ban"
            component={Link}
            to={"/department"}
            icon={<GroupsIcon />}
            iconPosition="start"
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
          />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined">Outlined</Button>
      </Box>
    </Box>
  );
}

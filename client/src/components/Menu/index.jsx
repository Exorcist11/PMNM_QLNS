import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import BarChartIcon from "@mui/icons-material/BarChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Home from "~/pages/Home";
import Department from "~/pages/Department";
import InfomationStaff from "~/pages/InfomationStaff";
import New from "~/pages/Newpaper";
import ManageStaff from "~/pages/ManageStaff";
import Report from "~/pages/Report";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "20%" }}
      >
        <Tab
          icon={<HomeIcon />}
          iconPosition="start"
          label="Trang chủ"
          {...a11yProps(0)}
        />
        <Tab
          icon={<PersonIcon />}
          iconPosition="start"
          label="Quản lý nhân viên"
          {...a11yProps(1)}
        />
        <Tab
          icon={<PeopleIcon />}
          iconPosition="start"
          label="Quản lý phòng ban"
          {...a11yProps(2)}
        />
        <Tab
          icon={<NotificationsIcon />}
          iconPosition="start"
          label="Thông báo"
          {...a11yProps(3)}
        />
        <Tab
          icon={<InfoIcon />}
          iconPosition="start"
          label="Thông tin cá nhân"
          {...a11yProps(4)}
        />
        <Tab
          icon={<BarChartIcon />}
          iconPosition="start"
          label="Báo cáo"
          {...a11yProps(5)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ManageStaff />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Department />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <New />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <InfomationStaff />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Report />
      </TabPanel>
    </Box>
  );
}

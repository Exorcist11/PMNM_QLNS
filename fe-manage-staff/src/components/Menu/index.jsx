import Box from "@mui/material/Box";
import MenuItem from "../MenuItem";

function Menu() {
  return (
    <Box sx={{ backgroundColor: "#FFD154", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <MenuItem to={"/report"} data={"Report"} />
        <MenuItem to={"/infomation-staff"} data={"Infor"} />
      </Box>
    </Box>
  );
}

export default Menu;

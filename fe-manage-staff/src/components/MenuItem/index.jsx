import { Box, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MenuItem({ to, data }) {
  return (
    <Box sx={{ padding: "7px 10px", color: "#002795" }}>
      <NavLink to={to} end style={{ textDecoration: "none" }}>
        <span>{data}</span>
        <Divider />
      </NavLink>
    </Box>
  );
}

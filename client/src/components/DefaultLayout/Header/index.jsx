import { Box } from "@mui/material";
import SuperscriptIcon from "@mui/icons-material/Superscript";
import AccountMenu from "../AccountMenu";
function Header() {
  return (
    <Box
      sx={{
        backgroundColor: "#0063EC",
        height: "55px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 90px",
        color: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <SuperscriptIcon fontSize="large" />
        <h2>Group 2</h2>
      </Box>

      <AccountMenu />
    </Box>
  );
}

export default Header;

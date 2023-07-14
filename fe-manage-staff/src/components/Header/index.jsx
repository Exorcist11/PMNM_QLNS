import { Box, Avatar } from "@mui/material";
import { purple } from "@mui/material/colors";
import SuperscriptIcon from "@mui/icons-material/Superscript";
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <label>Xin chao, ...</label>
        <Avatar sx={{ bgcolor: purple[500], width: "35px", height: "35px" }}>
          D
        </Avatar>
      </Box>
    </Box>
  );
}

export default Header;

import { Box, Container } from "@mui/material";
import Header from "./DefaultLayout/Header";
import Navbar from "./DefaultLayout/Navbar";

export default function DefaultLayout({ children }) {
  return (
    <Box>
      <Header />
      <Box display={"flex"}>
        <Box sx={{ width: "25%" }}>
          <Navbar />
        </Box>
        <Container maxWidth="xl" sx={{ marginTop: "16px" }}>
          <Box>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
}

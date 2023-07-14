import Menu from "~/components/Menu";
import Report from "../Report";
import { Box, Container } from "@mui/material";

function Home() {
  return (
    <>
      <Container maxWidth="lg" sx={{ display: "flex" }}>
        <Box width={"20%"}>
          <Menu />
        </Box>

        <Box>
          
        </Box>
      </Container>
    </>
  );
}

export default Home;

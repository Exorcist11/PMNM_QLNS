import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./routes";
import DefaultLayout from "./components";
import { Box } from "@mui/material";
import { Fragment } from "react";

export default function App() {
  return (
    <Box>
      <Routes>
        {publicRoute.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
}

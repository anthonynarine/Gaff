import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";

import createMuiTheme from "./theme/theme";
import Explore from "./pages/Explore";


function App() {
  const theme = createMuiTheme();


  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:categoryName" element={<Explore />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

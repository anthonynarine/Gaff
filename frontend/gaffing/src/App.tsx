import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";

import createMuiTheme from "./theme/theme";
import Explore from "./pages/Explore";
import ToggleColorMode from "./components/Color/ToggleColorMode";

function App() {

  return (
    <>
      <ToggleColorMode>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:categoryName" element={<Explore />} />
        </Routes>
      </ToggleColorMode>
    </>
  );
}

export default App;

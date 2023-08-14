import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Explore from "./pages/Explore";
import ToggleColorMode from "./components/Color/ToggleColorMode";
import Server from "./pages/Server";
import Login from "./pages/Login";
import { AuthServiceProvider } from "./components/context/AuthContext";

function App() {
  return (
    <>
      <AuthServiceProvider>
        <ToggleColorMode>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/server/:serverId/:channelId?" element={<Server />} />
            {/* the ? makes is optional without it will expect a property */}
            <Route path="/explore/:categoryName" element={<Explore />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ToggleColorMode>
      </AuthServiceProvider>
    </>
  );
}

export default App;

import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MainWrapper, SideNavBar } from "./components";
import { Archives, Dashboard, Notes } from "./Pages";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <SideNavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/archives" element={<Archives />} />
      </Routes>
    </MainWrapper>
  );
}

export default App;

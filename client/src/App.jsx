import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./pages/Chatbot";

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/auth";

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;

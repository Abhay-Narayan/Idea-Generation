import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./pages/Chatbot";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./redux/authSlice";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/auth';
  const hideFooter = location.pathname === '/auth' || location.pathname === '/chat';
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(login({ token, user })); 
    }
  }, [dispatch]);
  return (
    <div>
      {!hideHeader && <Header />} {/* Hide header on /auth */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
      {!hideFooter && <Footer />} {/* Hide footer on /auth and /chat */}
    </div>
  );
}


export default App;

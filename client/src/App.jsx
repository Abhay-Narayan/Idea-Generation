import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./pages/Chatbot";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "./redux/authSlice";
import Protected from "./constants/Protected";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/auth";
  const hideFooter =
    location.pathname === "/auth" || location.pathname === "/chat";
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(login({ token, user }));
    }
    setIsAuthChecked(true);
  }, [dispatch]);
  return (
    <div>
      {!hideHeader && <Header />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginSignup />} />
        {isAuthChecked ? (
          <Route
            path="/chat"
            element={
              <Protected>
                <Chatbot />
              </Protected>
            }
          />
        ) : (
          <Route path="/chat" element={<p>Loading...</p>} />
        )}
      </Routes>
      {!hideFooter && <Footer />} 
    </div>
  );
}

export default App;

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
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";  // Import SingleBlog component

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/auth";
  const hideFooter = location.pathname === "/auth" || location.pathname === "/chat";
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
    <div className="flex flex-col">
      {!hideHeader && <Header />} 
      <div className={`${!hideHeader && 'pt-14' }`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LoginSignup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} /> {/* Add route for SingleBlog */}
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
      </div>  
      {!hideFooter && <Footer />} 
    </div>
  );
}

export default App;

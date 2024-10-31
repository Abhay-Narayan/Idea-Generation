import Chatbot from "./pages/Chatbot";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginSignup />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
}

export default App;

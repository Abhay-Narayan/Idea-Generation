import { useState } from "react";
import { assets } from "../assets/assets/";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleAction = () => {
    setAction((prevAction) => (prevAction === "Login" ? "Sign up" : "Login"));
  };

  const handleaction = async (e) => {
    e.preventDefault();
    if (action == "Login") {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
          email,
          password,
        });
        const { token, user } = response.data;
        console.log(response.data.user);
        if (token) {
          dispatch(login({token,user}));
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
          username,
          email,
          password,
      });
      const { token, user } = response.data;
      if (token) {
          dispatch(login({token,user}));
          localStorage.setItem("token", token);
          navigate("/"); // Redirect to the home page after signup
        } else {
          console.error("Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-3xl text-white font-bold my-4">
            Turn Your Ideas into reality
          </h1>
          <p className="text-lg text-white font-normal">
            Start for free and get attractive offers from the community
          </p>
        </div>
        <img
          src={assets.login_cover}
          alt=""
          className="w-full h-full object-cover "
        />
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-center items-center">
        <div className="w-full flex flex-col max-w-[400px] ">
          <div className="w-full flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-2">{action}</h3>
            <p className="text-base mb-2">
              {action === "Login"
                ? "Welcome Back! Please enter your details."
                : "Create an account to start using our platform."}
            </p>
          </div>

          <div className="w-full fex fex-col">
            {action === "Login" ? (
              <div></div>
            ) : (
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-2 text-base border-gray-100 rounded-xl p-3 mt-1 outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 text-base border-gray-100 rounded-xl p-3 mt-1 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 text-base border-gray-100 rounded-xl p-3 mt-1 outline-none"
            />
          </div>

          <div className="w-full mt-4 flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember me for 30 days</p>
            </div>

            <p className="text-sm font-semibold text-main whitespace-nowrap cursor-pointer ">
              Forgot Password ?
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              onClick={handleaction}
              className="active:scale-[.98] w-full bg-main my-2 text-white text-lg rounded-xl p-2.5 text-center flex items-center justify-center cursor-pointer"
            >
              {action}
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative px-1 py-2">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-base absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>
          <button className="active:scale-[.98] w-full text-[#060606] my-5 bg-white border text-lg border-black/40 rounded-xl p-2 text-center flex items-center justify-center cursor-pointer">
            <img src={assets.google_logo} className="h-8 mr-2" alt="" />{" "}
            Continue with Google
          </button>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            {action === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={toggleAction}
              className="font-semibold text-main ml-2 cursor-pointer"
            >
              {action === "Login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

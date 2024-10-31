import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Header = () => {
  const isAuthenticated= useSelector((state)=>state.auth.isAuthenticated);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleauth=()=>{
    if(!isAuthenticated)navigate('/auth');
    else{
      dispatch(logout());
    }
  }

  return (
    <header className="fixed w-full z-50 flex justify-around items-center p-2 gap-80 bg-[#ffffff] shadow-lg">
      <div className="text-3xl font-bold">
        <a href="/" className=" no-underline hover:underline">Kreativ</a>
      </div>
      <nav className="flex gap-10 justify-center text-base ">
        <a href="/blog" className=" no-underline flex items-center  hover:text-main">Blogs</a>
        <button onClick={handleauth} className="bg-main text-white items-center py-2 px-3  rounded  no-underline hover:bg-purple-800">{isAuthenticated?"Logout":"Login"  }</button>
      </nav>
    </header>
  );
};

export default Header;

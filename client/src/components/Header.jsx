import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Header = () => {
  const location=useLocation();
  const isChat= location.pathname==='/chat';
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
    <header className={`${!isChat && 'fixed'} w-full z-50 flex justify-around items-center p-2 gap-80 bg-[#ffffff] shadow-lg`}>
      <div className="text-3xl font-bold">
        <a onClick={()=>navigate('/')} className=" no-underline hover:underline">Kreativ</a>
      </div>
      <nav className="flex gap-10 justify-center text-base ">
        <button onClick={()=>navigate('/chat')} className=" no-underline flex items-center  hover:text-main">Chat</button>
        <button onClick={handleauth} className="bg-main text-white items-center py-2 px-3  rounded  no-underline hover:bg-purple-800">{isAuthenticated?"Logout":"Login"  }</button>
      </nav>
    </header>
  );
};

export default Header;

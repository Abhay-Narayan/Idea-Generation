
import { useSelector } from "react-redux";
import { assets } from "../assets/assets/";

const Profile = () => {
  const {user}=useSelector((state)=>state.auth);
  return (
    <div className="shadow-lg flex flex-col mt-5 items-center border rounded-2xl bg-white p-2  relative">
      <div className="h-[120px] w-full top-0 border rounded-t-2xl bg-main absolute z-0"></div>
      <div className="w-[150px] h-[150px] z-10 ">
        <img
          className="h-full w-full rounded-full p-1"
          src={assets.profile_pic}
          alt=""
        />
      </div>
      <div className="text-xl font-bold text-gray-800 pt-1">
        <h2>{user && user.username}</h2>
      </div>
      <div className="text-sm p-3 italic text-gray-600">Description</div>
      <div className="w-full border-t border-gray-300 py-3 mt-5 text-[14px] flex flex-col font-medium">
        <p className="h-8 flex items-center justify-between">
          <span className="text-gray-500">Profile viewers</span>
          <span className="text-main">143</span>
        </p>
        <p className="h-8 flex items-center justify-between">
          <span className="text-gray-500">Post impressions</span>
          <span className="text-main">745</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;

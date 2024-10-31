import React from "react";
import { assets } from "../assets/assets/";

const Profile = () => {
  return (
    <div className="flex flex-col items-center border rounded-2xl bg-gray-100 p-4 m-4 relative">
      <div className="h-[120px] w-full top-0 border rounded-t-2xl bg-main absolute z-0"></div>
      <div className="w-[150px] h-[150px] z-10 ">
        <img
          className="h-full w-full rounded-full p-1"
          src={assets.profile_pic}
          alt=""
        />
      </div>
      <div className="text-xl font-bold pt-1">
        <h2>Your Name</h2>
      </div>
      <div className="text-sm p-3">Description</div>
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

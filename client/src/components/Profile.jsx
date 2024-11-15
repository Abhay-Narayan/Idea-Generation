import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { FiEdit3 } from "react-icons/fi"; // Icon for editing text fields
import { FaCamera } from "react-icons/fa"; // Icon for uploading image
import axiosInstance from "../constants/ProtectedRoutes";
import { updateUser } from "../redux/authSlice";
import mask from "../assets/mask.png";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [showEditModal, setShowEditModal] = useState(false);
  const [description, setDescription] = useState(user?.description || '');
  const [username, setUsername] = useState(user?.username || '');
  const [imgurl, setImgurl] = useState(null);
  const dispatch = useDispatch();
  const [refresh, setrefresh]= useState(false);

  const handleEditToggle = () => {
    setShowEditModal(!showEditModal);
  };

  const handleProfilePicChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const response = await axiosInstance.post(`/user/upload-dp`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImgurl(response.data.user.profilePic);
        setrefresh(!refresh)
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    } else {
      alert("please select files");
    }
  };

  useEffect(() => {
    const getUserprofile = async () => {
      try {
        const response = await axiosInstance.get("/user/get-profile-pic");
        setImgurl(response.data.profilePic);
      } catch (error) {
        console.error(error);
      }
    };
    getUserprofile();
  }, [refresh]);
  
 // Trigger effect when user._id or refresh changes
  
   

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put("/user/editUser", {
        description,
        username,
      });
      setrefresh(!refresh);
      dispatch(updateUser({
        username: response.data.user.username,
        description: response.data.user.description,
      }));
      
    } catch (error) {
      console.error(error);
    }
    setShowEditModal(false);
  };

  return (
    <div className="shadow-lg flex flex-col mt-5 items-center border rounded-2xl bg-white relative">
      <div className="h-[120px] w-full top-0 border rounded-t-2xl bg-gradient-to-r from-main to-purple-700 absolute z-0"></div>

      {/* Profile Picture with Upload Icon */}
      <img
        src={mask}
        className="absolute w-[265px] h-[200px] object-cover "
        alt=""
      />
      <div className="relative w-[150px] h-[150px] z-10 p-1">
        <img
          className="h-[85%] w-[85%] mt-5 mx-auto rounded-full border-4 border-white object-cover"
          src={imgurl ? imgurl : assets.profile_pic}
          alt="Profile"
        />
        <label
          htmlFor="profilePicUpload"
          className="absolute bottom-2 right-2 bg-main p-2 rounded-full cursor-pointer"
        >
          <FaCamera className="text-white" />
        </label>
        <input
          type="file"
          id="profilePicUpload"
          onChange={handleProfilePicChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      <div className="flex items-center space-x-2 mt-3 text-xl font-bold text-gray-800 relative">
        <h2>{username?username:'Loading...'}</h2>
        <FiEdit3
          onClick={handleEditToggle}
          className="text-gray-500 cursor-pointer hover:text-main"
          title="Edit Profile"
        />
      </div>
      <div className="text-sm p-3 italic text-gray-600">
        <span>{description?description:("Add a description")}</span>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Edit Profile
            </h2>

            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username||""}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-main focus:border-main mb-4"
            />

            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description|| ""}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-main focus:border-main mb-4"
              rows="3"
              placeholder="Describe yourself..."
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleEditToggle}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-main text-white py-2 px-4 rounded-lg hover:bg-hovermain active:scale-[0.98] transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile statistics */}
      <div className="p-2 w-full border-t border-gray-300 py-3 mt-5 text-[14px] flex flex-col font-medium">
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

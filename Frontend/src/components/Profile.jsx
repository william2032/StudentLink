import React from 'react';
import { FaBell, FaCaretDown, FaUserCircle } from "react-icons/fa";

const Profile = ({ userName }) => {
    return (
        <div className="absolute top-0 left-387 bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-300">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg text-black font-bold">Profile</h1>
                <div className="flex items-center space-x-2 text-gray-500">
                    <FaBell className="cursor-pointer" />
                    <FaCaretDown className="cursor-pointer" />
                </div>
            </div>
            
            <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border border-gray-300">
                <FaUserCircle className="text-gray-500 ml-6 mt-6" size={50} />
                </div>
                <h2 className="text-lg text-black font-semibold mb-2">{ userName || "John Doe"}</h2>
                <div className="text-gray-700 text-sm">
                    <p><span className="font-semibold">Personal Info.</span></p>
                    <p><span className="font-semibold">Education</span> </p>
                    <p><span className="font-semibold">Skills</span></p>
                    <p><span className="font-semibold">Interests</span></p>
                    <p><span className="font-semibold">Social Links</span></p>
                </div>
                <button className="bg-purple-500 text-white px-4 py-2 rounded mt-4 hover:bg-purple-600">Update Profile</button>
            </div>
        </div>
    );
};
export default Profile;
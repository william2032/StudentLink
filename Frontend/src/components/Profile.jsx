import React, { useState } from 'react';
import { FaBell, FaCaretDown, FaUserCircle } from "react-icons/fa";
import UpdateProfileForm from './UpdateProfileForm'; 

const Profile = ({ userName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: userName || "",
        email: "",
        admissionNo: "",
        programStudy: "",
        skills: "",
        interests: "",
        socialLinks: ""
    });

    const handleUpdateProfile = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="absolute top-4 left-230 bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-300">
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
                <p><span className="font-semibold">YEAR:</span> <span className="ml-10">3</span></p>
                    <p><span className="font-semibold">Admission No:</span> <span className="ml-4">{formData.admissionNo || "EB1/61319/22"}</span></p>
                    <p><span className="font-semibold">PROGRAM STUDY:</span> <span className="ml-4">{formData.programStudy || "Computer Science"}</span></p>
                  </div>
                <button onClick={handleUpdateProfile} className="bg-purple-500 text-white px-4 py-2 rounded mt-4 hover:bg-purple-600">Update Profile</button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-center text-2xl font-bold mb-6">Update Profile</h2>
                        <UpdateProfileForm formData={formData} setFormData={setFormData} handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
};
export default Profile;
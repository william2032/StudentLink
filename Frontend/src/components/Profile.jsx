import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import { FaBell, FaCaretDown, FaUserCircle } from "react-icons/fa";

const Profile = ({ userName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [admissionNo, setAdmissionNo] = useState("");
    const [programStudy, setProgramStudy] = useState("");

    const handleUpdateProfile = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Admission No:", admissionNo);
        console.log("Program Study:", programStudy);
        handleCloseModal();
    };
    return (
        <div className="absolute top-4 left-387 bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-300">
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
                <button onClick={handleUpdateProfile} className="bg-purple-500 text-white px-4 py-2 rounded mt-4 hover:bg-purple-600">Update Profile</button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40"     style={{ overflowY: "auto" }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-300">
                        <h2 className="text-lg font-bold mb-4">Update Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="block mb-2">
                                <h3 className="text-lg text-black font-semibold mb-2">Personal Info:</h3>
                                    <ul>
                                        <li className='flex justify-between  mb-2'>
                                            <label className="text-lg text-black font-semibold ">First Name</label>
                                            <h2 className=" text-black  mb-2">{  "John"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                            </li>
                                        <li className='flex justify-between  mb-2  mb-2'>
                                            <label className="text-lg text-black font-semibold ">Last Name</label>
                                            <h2 className=" text-black  mb-2">{ "Doe"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                        </li>
                                        <li className='flex justify-between  mb-2'>
                                            <label className="text-lg text-black font-semibold ">Username</label>
                                            <h2 className=" text-black mb-2">{ userName || "JohnDoe"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                        </li>
                                        <li className='flex justify-between  mb-2'>
                                            <label className="text-lg text-black font-semibold ">Email</label>
                                            <h2 className="text-black  mb-2">{ "john.doe@gmail.com"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                        </li>
                                    </ul>
                            </div>
                            <hr className="my-4" />
                            <div className="block mb-6">
                                <h3 className="text-lg text-black font-semibold mb-2">Education:</h3>
                                    <ul>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Program-name</label>
                                            <h2 className=" text-black  mb-2">{ "Computer Science"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Faculty</label>
                                            <h2 className=" text-black  mb-2">{ "Science and Technology"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Department</label>
                                            <h2 className=" text-black  mb-2">{ "Computer Science"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                        </li>
                                        <li className='flex justify-between'>
                                            <label className="text-lg text-black font-semibold ">Year-of-study</label>
                                            <h2 className=" text-black  mb-2">{ "year 3"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Change</button>
                                        </li>
                                    </ul>
                            </div>
                            <hr className="my-4" />
                            <div className="block mb-6">
                                <h3 className="text-lg text-black font-semibold mb-2">Skills:</h3>
                                    <ul>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Skill 1</label>
                                            <h2 className=" text-black  mb-2">{ "Web Development and Design"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Skill 2</label>
                                            <h2 className=" text-black  mb-2">{ "Full Stack Development wit Springboot"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Skill 3</label>
                                            <h2 className=" text-black  mb-2">{ "Python Developer"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                        <li className='flex justify-between'>
                                            <label className="text-lg text-black font-semibold ">Skill 4</label>
                                            <h2 className=" text-black  mb-2">{ "Graphical Design"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                    </ul>
                            </div>
                            <hr className="my-4" />
                            <div className="block mb-6">
                                <h3 className="text-lg text-black font-semibold mb-2">Interests:</h3>
                                    <ul>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Interest 1</label>
                                            <h2 className=" text-black  mb-2">{ "Sports Cars"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">Interest 2</label>
                                            <h2 className=" text-black  mb-2">{ "AI/ML"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label className="text-lg text-black font-semibold ">interest 3</label>
                                            <h2 className=" text-black  mb-2">{ "Coding"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                    </ul>
                            </div>
                            <hr className="my-4" />
                            <div className="block mb-6">
                                <h3 className="text-lg text-black font-semibold mb-2">Social Link:</h3>
                                    <ul>
                                        <li className='flex justify-between mb-2'>
                                        <label><FontAwesomeIcon icon={faGithub} className="text-black text-lg" title="GitHub" /></label>                                            
                                        <h2 className=" text-black  mb-2">{ "https://github.com/kimingi318"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label> <FontAwesomeIcon icon={faDiscord} className="text-black text-lg" title="Discord" /></label>
                                            <h2 className=" text-black  mb-2">{ "Your profile link"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                        <li className='flex justify-between mb-2'>
                                            <label>  <FontAwesomeIcon icon={faTwitter} className="text-black text-lg" title="Twitter" /></label>
                                            <h2 className=" text-black  mb-2">{ "your profile link"}</h2>
                                            <button  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Details</button>
                                        </li>
                                    </ul>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-400 text-white px-4 py-2 rounded mr-2">Cancel</button>
                                <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Profile;
import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Profile from "./Profile.jsx";



const Sidebar = ({ userName }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    navigate("/"); // Redirect to SplashScreen
  };

  return (
    <div className="w-60 h-screen bg-purple-500 p-5 text-white rounded-lg flex flex-col fixed left-2 top-4">
      <div className="flex items-center space-x-2 mb-6">
        <FaGraduationCap size={30} />
        <h2 className="">StudentLink</h2>
      </div>
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center space-x-2 hover:opacity-80">
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-2 opacity-70 ">
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 opacity-70 ">
          <span>My Network</span>
        </a>
        <a href="#" className="flex items-center space-x-2 opacity-70 ">
          <span>Applications</span>
        </a>
        <a href="#" className="flex items-center space-x-2 opacity-70 ">
          <span>Me</span>
        </a>
        <a href="#" className="flex items-center space-x-2 opacity-70 ">
          <span>Groups</span>
        </a>
      </nav>
      <div className="mt-auto">
      <a href="#" className="flex items-center space-x-2 hover:opacity-80" onClick={handleLogout}>
      <FiLogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

const Dashboard = ({ userName }) => {
  // State for date
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);
  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* Call the Profile component here */}
      <Profile userName={userName} />
      <Sidebar userName={userName} />
      <div className="flex-1 ml-60 mr-90 p-4 ">
        {/* Welcome Message Centered at Top */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white text-center p-8 h-60 rounded-lg shadow-lg justify-center">
          <div className="flex justify-center mb-4">
            <FaGraduationCap size={30} className="mr-2"/>
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md p-2 border border-gray-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-sm">{currentDate}</p>
          <div className="flex flex-col items-center text-center mt-10">
            <h1 className="text-2xl font-bold">Welcome back, {userName || "John"}!</h1>
            <p className="text-md">Always stay updated in your portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SplashScreen = ({ onLogin }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Student Portal</h1>
        <button onClick={onLogin} className="bg-white text-purple-600 px-6 py-2 rounded-lg shadow-lg">Login</button>
      </div>
    </div>
  );
};

export default Dashboard;

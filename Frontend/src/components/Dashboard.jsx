import React, { useState } from "react";

import Profile from "./Profile.jsx";
import { FaGraduationCap } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

export const Dashboard = () => {
  return (
    <div className="w-60 h-screen bg-purple-500 p-5 text-white flex flex-col">
    <div className="flex items-center space-x-2 mb-6">
      <FaGraduationCap size={30} />
    </div>
    <nav className="flex flex-col space-y-4">
      <a href="#" className="flex items-center space-x-2 hover:opacity-80">
        <MdDashboard size={20} />
        <span>Dashboard</span>
      </a>
      <a href="#" className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
        <span>Drop Semester</span>
      </a>
    </nav>
    <div className="mt-auto">
      <a href="#" className="flex items-center space-x-2 hover:opacity-80">
        <FiLogOut size={20} />
        <span>Logout</span>
      </a>
    </div>
  </div>
);
};

const Main = () => {
return (
  <div className="flex h-screen">
    {/* <Sidebar /> */}
    <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-purple-400 p-10">
      <Profile />
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-gray-500 text-sm">Feb 27, 2025</p>
        <h1 className="text-xl font-bold">Welcome back, John!</h1>
        <p className="text-gray-600">Always stay updated in your student portal</p>
      </div>
    </main>
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

const App = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);

return isLoggedIn ? <Dashboard /> : <SplashScreen onLogin={() => setIsLoggedIn(true)} />;
};
  


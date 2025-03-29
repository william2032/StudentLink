import React, { useEffect, useState } from "react";
import { FaBell, FaCaretDown, FaGraduationCap, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiSkills } from "react-icons/gi";
import { MdDashboard, MdEmail, MdInterests } from "react-icons/md";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Applications from "./Applications"; // Import the Applications component
import UpdateProfileForm from './UpdateProfile'; // Import the UpdateProfileForm component
import ViewProfileForm from './ViewProfile';
import microsoft from "/public/microsoft.jpg"; // Import your image here
import google from "/public/google.svg";
import NewsPost from "./NewsPost";

const jobPosts = [
  {
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    description: "Microsoft is hiring interns for summer 2024.",
    image: microsoft,
  },
  {
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    description: "Amazon is looking for software development interns.",
    image: "https://your-amazon-image-url.com",
  },
  {
    company: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Facebook_Logo_2023.png",
    description: "Facebook is looking for software engineering interns.",
    image: "https://your-facebook-image-url.com",
  },
  {
    company: "Safaricom",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Safaricom_logo.svg/1200px-Safaricom_logo.svg.png",
    description: "Exciting internship opportunity at Safaricom.",
    image: "https://your-safaricom-image-url.com",
  },
  {
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description: "Google's Summer of Code program is open for applications.",
    image: google,
  },
  {
    company: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    description: "Oracle is offering database engineering internships.",
    image: "https://your-oracle-image-url.com",
  },
  {
    company: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    description: "Join IBM’s software development internship program.",
    image: "https://your-ibm-image-url.com",
  },
];

// import Profile from "./Profile.jsx";
const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    navigate("/"); // Redirect to SplashScreen
  };

  return (
    <div className="w-60 h-200 bg-purple-500 p-5 sidebar text-white rounded-lg flex flex-col fixed left-4 top-4">
      <div className="flex items-center space-x-2 mb-6">
        <FaGraduationCap size={30} />
        <h2 className="">StudentLink</h2>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80">
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/dashboard/applications" className="flex items-center space-x-2 opacity-70">
          <span>Applications</span>
        </Link>
        <Link to="/dashboard/status" className="flex items-center space-x-2 opacity-70">
          <span>Status</span>
        </Link>
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
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation(); // Get the current location

  // Update date on component mount
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

  // Check if the current route is the main dashboard
  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <div className="relative flex h-screen bg-[#2e2e2e]">
      {/* Render UserProfile only on the main dashboard */}
      {isMainDashboard && <UserProfile userName={userName} />}

      <Sidebar userName={userName} />
      <div className="flex-1 ml-68 mr-90 p-4">
        {/* Show welcome message and search bar only on the main dashboard */}
        {isMainDashboard && (
          <div>
              <div className="bg-gradient-to-r from-purple-500 mainDashboard to-purple-400 text-white text-center p-8 h-60 rounded-lg shadow-lg justify-center">
                <div className="flex justify-center mb-4">
                  <FaGraduationCap size={30} className="mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <p className="text-sm">{currentDate}</p>
                <div className="flex flex-col items-center text-center mt-10">
                  <h1 className="text-2xl font-bold">Welcome back, {userName || "John"}!</h1>
                  <p className="text-md">Always stay updated in your portal</p>
                </div>
              </div>
 

      {/* News Section */}
      <div className="space-y-6 m-5">
        {jobPosts.map((job, index) => (
          <NewsPost
            key={index}
            company={job.company}
            logo={job.logo}
            description={job.description}
            image={job.image}
          />
        ))}
      </div>          
        </div>
        )}

        {/* Routes for Dashboard Content */}
        <Routes>
          <Route path="applications" element={<Applications />} />
          <Route path="status" element={<Status />} />
          {/* Add other nested routes here */}
        </Routes>
      </div>
    </div>  
  );
};

const UserProfile = ({ userName, userEmail }) => {
    const [isModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        // firstName: "",
        // lastName: "",
        // email: "",
        admissionNo: "",
        programStudy: "",
        skillname: "",
        skillDescription: "",
        interest: "",
        interestDescription: "",
        socialLinks: ""
    });

    const handleViewProfile = () => {
        setIsViewModalOpen(true);
    };

    const handleUpdateProfile = () => {
        setIsUpdateProfileModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
    };

    const handleCloseUpdateProfileModal = () => {
        setIsUpdateProfileModalOpen(false);
    };
        return (
        <div className=" top-4 fixed userProfile bg-gradient-to-r from-purple-500 to-purple-400 h-200 text-white   rounded-lg shadow-lg w-80">
            <div className="profile-picture rounded-lg p-2 h-60 text-center" >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg text-black font-bold">Profile</h1>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <FaBell className="cursor-pointer" />
                        <FaCaretDown className="cursor-pointer" />
                    </div>
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden ml-26 mb-4 border border-gray-300">
                  <FaUserCircle className="text-gray-500 ml-3 mt-3" size={50} />
                </div>
                <h2 className="text-lg text-black font-semibold mb-2">{ userName || "John Doe"}</h2>
            </div>
            <div className="flex flex-col p-4">
                    <div>
                      <FaGraduationCap size={30} className="mr-2" />
                      <hr />
                      <p><span className="ml-4">{formData.admissionNo || "EB1/61319/22"}</span></p>
                      <p><span className="ml-4">{formData.programStudy || "Computer Science"}</span></p>
                    </div>
                    <div  className="mt-2">
                      <MdEmail size={30} className="mr-2"/>
                      <hr />
                      <p><span className="ml-4">{userEmail || "johndoe123@gmail.com"}</span></p>
                    </div>
                    <div className="mt-2">
                      <GiSkills size={30} className="mr-2"/>
                      <hr />
                      <p><span className="ml-4">{formData.skillname || "Python"}</span></p>
                    </div>
                    <div className="mt-2"> 
                      <MdInterests size={30} className="mr-2" />
                      <hr />
                      <p><span className="ml-4">{formData.interest || "Web Development"}</span></p>
                    </div>
            </div>
            <div className='btn items-center space-x-15 p-4'>
                    <button onClick={handleUpdateProfile} className="update-btn  text-white rounded ">Update profile</button>
                    <button onClick={handleViewProfile} className="update-btn text-white rounded  ">View profile </button>
            </div>
            {isUpdateProfileModalOpen && (
                <div className="fixed inset-0 flex enhanceForm items-center justify-center backdrop-blur-md bg-black/30">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-center text-2xl font-bold mb-6">Update Your Profile</h2>
                        <p>Add this section to your profile</p>
                        <UpdateProfileForm formData={formData} setFormData={setFormData} handleCloseModal={handleCloseUpdateProfileModal} />
                    </div>
                </div>
            )}
 
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-center text-2xl font-bold mb-6">View Profile</h2>
                        <ViewProfileForm formData={formData} setFormData={setFormData} handleCloseModal={handleCloseViewModal} />
                    </div>
                </div>
            )}
        </div>
    );
};


export default Dashboard;
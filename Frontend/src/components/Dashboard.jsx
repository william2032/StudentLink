import React, { useEffect, useState } from "react";
import { FaBell, FaCaretDown, FaGraduationCap } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { RiProgress7Fill } from "react-icons/ri";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Applications from "./Applications"; // Import the Applications component
import NewsPost from "./NewsPost";
import Status from "./Status";
import UpdateProfileForm from './UpdateProfile'; // Import the UpdateProfileForm component
import ViewProfileForm from './ViewProfile';


const jobPosts = [
  {
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    description: "Microsoft is hiring interns for summer 2024.",
    image: "https://www.pymnts.com/wp-content/uploads/2023/07/Microsoft-3.jpg",
  },
  {
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    description: "Amazon is looking for software development interns.",
    image: "https://www.xboxdynasty.de/wp-content/uploads/2016/11/amazon-11.jpg",
  },
  {
    company: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Facebook_Logo_2023.png",
    description: "Facebook is looking for software engineering interns.",
    image: "https://onlinemarketing.de/wp-content/uploads/2019/03/facebook-logo-holz-1.jpg",
  },
  {
    company: "Safaricom",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Safaricom_logo.svg/1200px-Safaricom_logo.svg.png",
    description: "Exciting internship opportunity at Safaricom.",
    image: "https://cioafrica.co/wp-content/uploads/2023/08/1200x800.jpg",
  },
  {
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description: "Google's Summer of Code program is open for applications.",
    image: "/google.jpeg",
  },
  {
    company: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    description: "Oracle is offering database engineering internships.",
    image: "https://www.paradavisual.com/wp-content/uploads/2022/09/oracle-2.jpg",
  },
  {
    company: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    description: "Join IBM's software development internship program.",
    image: "https://erp.today/wp-content/uploads/2022/05/ibm_0.jpeg",
  },
];

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
        <Link to="/dashboard/applications" className="flex items-center space-x-2 hover:opacity-80">
         <FaWpforms size={20}/>
          <span>Applications</span>
        </Link>
        <Link to="/dashboard/status" className="flex items-center space-x-2 hover:opacity-80">
          <RiProgress7Fill size={20}/>
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


const Dashboard = ({ studentId }) => {
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation();
  const [username, setUsername] = useState("");
  
  // Add this function to update username
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  // Store studentId in localStorage when it changes
  useEffect(() => {
    if (studentId) {
      localStorage.setItem('studentId', studentId);
    }
  }, [studentId]);

  // Get studentId from localStorage on component mount
  useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    console.log('Retrieved studentId from localStorage:', storedStudentId);
    
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
      {/* Pass updateUsername function to UserProfile */}
      {isMainDashboard && <UserProfile studentId={studentId} onUsernameUpdate={updateUsername} />}

      <Sidebar />
      <div className="flex-1 ml-68 mr-90 p-4">
        {/* Show welcome message and search bar only on the main dashboard */}
        {isMainDashboard && (
          <div>
            <div className="bg-gradient-to-r from-purple-500 mainDashboard to-purple-400 text-white text-center p-8 h-60 rounded-lg shadow-lg justify-center">
              <p className="text-sm">{currentDate}</p>
              <div className="flex flex-col items-center text-center mt-10">
                <h1 className="text-2xl font-bold">Welcome back, {username}!</h1>
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

const UserProfile = ({ studentId, onUsernameUpdate }) => {
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);

    const API_URL = "http://localhost:8080/api/students"; // Replace with your backend API URL
    // Use localStorage studentId as fallback
    const effectiveStudentId = studentId || localStorage.getItem('studentId');

    // Fetch user data based on studentId
    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch(`${API_URL}/${effectiveStudentId}`); // Make the API call
              console.log("API Response:", response); // Debugging log
              if (!response.ok) {
                  console.error(`No user data found for studentId: ${effectiveStudentId}, status: ${response.status}`);
                  return; // Exit the function if there's an error
              }
  
              const data = await response.json(); // Parse the JSON response
              console.log("User data fetched successfully:", data); // Debugging log
              
              setFirstname(data.firstname);
              setLastname(data.lastname);
              setUsername(data.username);
              setEmail(data.email);
              // Update the parent component's username
              onUsernameUpdate(data.username);
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
      };

      if (effectiveStudentId) {
      fetchUserData(); }// Call the function to fetch user data
    }, [effectiveStudentId, onUsernameUpdate]); // Dependency array to run the effect when studentId changes
  
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
        <div className="fixed top-4  userProfile bg-gradient-to-r from-purple-500 to-purple-400 h-20 text-white rounded-lg shadow-lg w-80">
            <div className="profile-picture rounded-lg p-2 h-100 text-center">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-[18px] text-black font-bold ">Profile</h1>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <FaBell className="cursor-pointer" />
                        <FaCaretDown className="cursor-pointer" />
                    </div>
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden ml-26 mb-4 border border-gray-300">
                    <img src="student.avatar.png" alt="student" />
                </div>
                <h2 className="text-lg text-black font-semibold mt-8 ">{ username || "John Doe"}</h2>
                <div className="p-4 flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 sm:mt-[12vh] justify-center items-center">
                  <button onClick={handleViewProfile} className=" btn1 px-6 py-2 bg-transparent text-black rounded-2xl shadow hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto ">View profile</button>
                  <button onClick={handleUpdateProfile} className=" btn1 px-6 py-2 bg-transparent text-black  rounded-2xl shadow hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto">Enhance Your profile</button>
                </div>
            </div>

            {isUpdateProfileModalOpen && (
                <div className="fixed inset-0 flex enhanceForm items-center justify-center backdrop-blur-md bg-black/30">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-center text-2xl font-bold mb-6">Enhance Your Profile</h2>
                        <UpdateProfileForm  studentId={effectiveStudentId} handleCloseModal={handleCloseUpdateProfileModal} />
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md  bg-black/30">
                    <div className="bg-white p-2 rounded-lg shadow-md viewprofile">
                        <h4 className=" text-[20px] font-semibold  mb-6 ml-6" >PROFILE</h4>
                        <ViewProfileForm 
                          studentId={effectiveStudentId}
                          handleCloseModal={handleCloseViewModal} 
                          handleUpdateProfile={handleUpdateProfile} // Pass the function to handle update profile
                          firstname={firstname}
                          lastname={lastname}
                          username={username}
                          email={email}
                        />                   
                    </div>
                </div>
            )}
        </div>
    );
};


export default Dashboard;
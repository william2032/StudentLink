import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    // Simulate successful registration
    onRegisterSuccess();
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold mb-6">STUDENTLINK</h2>

      <div className="mb-4 flex items-center border rounded-lg p-2">
        <FaUser className="text-gray-500 mr-2" />
        <input type="text" placeholder="First Name" className="w-full outline-none" />
      </div>

      <div className="mb-4 flex items-center border rounded-lg p-2">
        <FaUser className="text-gray-500 mr-2" />
        <input type="text" placeholder="Last Name" className="w-full outline-none" />
      </div>

      <div className="mb-4 flex items-center border rounded-lg p-2">
        <FaUser className="text-gray-500 mr-2" />
        <input type="text" placeholder="Username" className="w-full outline-none" />
      </div>

      <div className="mb-4 flex items-center border rounded-lg p-2">
        <FaEnvelope className="text-gray-500 mr-2" />
        <input type="email" placeholder="Enter email" className="w-full outline-none" />
      </div>

      <div className="mb-4 flex items-center border rounded-lg p-2">
        <FaLock className="text-gray-500 mr-2" />
        <input type="password" placeholder="Password" className="w-full outline-none" />
      </div>

      <div className="mb-4 flex items-center border rounded-lg p-2">
        <FaLock className="text-gray-500 mr-2" />
        <input type="password" placeholder="Repeat password" className="w-full outline-none" />
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Register;

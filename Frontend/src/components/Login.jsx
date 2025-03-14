import React from 'react';
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ openRegister }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "http://localhost:8080/api/login";
  const navigate = useNavigate();
  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }
      const data = await response.json();

      if (data.success && data.message) {
        console.log("Login successful:", data);
        setUsername(data.username || " ");
        setTimeout(() => {
          navigate('/dashboard');

        }, 1500)

      } else {
        setErrorMessage('Invalid username or password');
      }

    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
    };
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-center text-2xl font-bold mb-6">STUDENTLINK</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4 flex items-center border rounded-lg p-2">
          <FaUser className="text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <div className="mb-4 flex items-center border rounded-lg p-2">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} {/* Display error message */}

        <p className="text-right text-sm text-gray-500">Forgot password?</p>

        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4 cursor-pointer">
          Log in
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <span
          className="text-purple-500 cursor-pointer"
          onClick={openRegister}
        >
          Sign up
        </span>
      </p>
    </div>
  );

};

export default Login;

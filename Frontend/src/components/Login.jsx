
import React from 'react';
import Splash from "./Splash.jsx";

const Login = () => {
    return (
        <section>
            <div>
                <Splash/>
            </div>
        </section>
    );
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const Login = ({ openRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-center text-2xl font-bold mb-6">STUDENTLINK</h2>

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

      <p className="text-right text-sm text-gray-500">Forgot password?</p>

      <button className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4">
        Log in
      </button>

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

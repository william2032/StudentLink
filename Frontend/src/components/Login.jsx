import React from 'react';
import {useNavigate} from "react-router-dom";

import {useState} from "react";
import {FaUser, FaLock} from "react-icons/fa";

const Login = ({openRegister}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4 login">
            <h2 className="text-center text-2xl font-bold mb-6">STUDENTLINK</h2>

            <div className="flex items-center border rounded-lg p-2 mb-[20px]">
                <FaUser className="text-gray-500 mr-2"/>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full outline-none"
                />
            </div>

            <div className="mt-[10px] flex items-center border rounded-lg p-2">
                <FaLock className="text-gray-500 mr-2"/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none"
                />
            </div>

            <p className="text-right text-sm text-gray-500">Forgot password?</p>

            <button onClick={() => navigate("/dashboard")}
                    className="mt-[30px] bg-purple-700 text-white px-4 py-2 rounded cursor-pointer">Log in
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

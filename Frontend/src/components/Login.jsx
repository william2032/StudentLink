import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ openRegister, setUserName }) => {

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
        setErrorMessage('Login failed: ' + response.statusText);
      }
      const data = await response.json();

      if (data.success && data.message) {
        setUserName(data.username || username);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000)
      } else {
        setErrorMessage('Invalid username or password');
      }

    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
    }
    ;
  };
  return (
    <div className='login-container'>
      <div className="left-section">
        <div className="login-form ">
          <div className='text-left '>
            <h2 className='text-3xl font-semibold text-white mb-3'>Login</h2>
            <p className='flex text-[13px] mb-5 '>Enter your account details</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group text-white">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {errorMessage &&
              <p className="text-red-500 text-sm">{errorMessage}</p>}

            <p className="text-right text-[12px] text-gray-500">Forgot password ?</p>

            <button type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4 cursor-pointer login-button">
              Login
            </button>
          </form>
          <p className="text-center text-sm  mr-3  md:mt-[15px] ">
            Don't have an account? {" "}
            <span
              className="text-purple-500 cursor-pointer pl-2 "
              onClick={openRegister}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
      <div className="right-section mt-5 " style={{ backgroundImage: 'url("/studentbanner.svg"), linear-gradient(to right, #4b0082, #8a2be2)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className='w-full text-center flex-wrap '>
          <h2 className="text-center   mb-6 justify-center">Welcome to <br /> <span className='font-light text-[25px]'>STUDENT LINK</span></h2>
          <p className='text-black text-sm' >Where we bring Opportunities to you</p>
        </div>

      </div>
    </div>


  );

};

export default Login;

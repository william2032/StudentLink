import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Splash = () => {
    const navigate = useNavigate();
    return (
        <div className=" flex  md:max-w-screen-xl  md:mx-auto   mt-10  relative overflow-hidden splash h-1/2 ">
            <div>

            </div>
            <div
                className="md:w-1/2  w-full   bg-gradient-to-r from-[#011638] to-[#53387E] bg-[#15121C]/50 text-white p-10 backdrop-blur-md md:h-[90vh]  flex flex-col justify-center items-center text-center   rounded-2xl div-left ">
                {/*student logo*/}
                <div className="flex flex-col items-center justify-between">
                    <h1 className="text-4xl font-bold">STUDENTLINK</h1>
                    <p className="mt-4 text-xl">connecting students</p>
                </div>
                <div className="flex flex-col  space-y-10 my-[150px]">
                    <p className="mt-2">Connecting students with the best Attachments/Internships opportunities.</p>
                </div>
            </div>
            {/*profiles*/}
            <div
                className="max-w-4xl md:w-full flex flex-col justify-center p-6 bg-[#F6F8FF]  mx-4 rounded-2xl  div-right">
                <div className="justify-start my-4 flex ml-[25px]">
                    <h2 className="text-2xl  font-bold"><span className="text-4xl font-semibold">W</span>elcome</h2>
                </div>

                <div className="flex space-x-4 mt-6 items-center justify-center">
                    {/*students*/}
                    <div className="flex items-center">
                        <div
                            className="bg-[#53387E] text-white w-[238px] h-[243px] flex flex-col justify-center items-center rounded-[15px]">
                            <span className="text-2xl"><img src="/students.svg" alt="graduation"/></span>

                            <div>
                                <p className="mt-2 text-2xl">Students</p>
                                <button onClick={() => navigate("/login")}
                                        className="mt-[30px] bg-purple-700 text-white px-4 py-2 rounded">Log in
                                </button>
                            </div>
                        </div>
                    </div>

                    {/*company*/}
                    <div className="flex items-center">
                        <div
                            className="bg-[#53387E] text-white w-[238px] h-[243px] flex flex-col justify-center items-center rounded-[15px]">
                            <span className="text-2xl"><img src="/company.svg" alt="company"/></span>
                            <div>
                                <p className="mt-2 text-2xl">Company</p>
                                {/*<button onClick={onLoginClick}*/}
                                {/*        className="mt-[30px] bg-purple-700 text-white px-4 py-2 rounded">Log in*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-10  mb-5 items-center justify-center sign">Don't have an account?{" "} <span
                    onClick={() => navigate("/login")} className='text-purple-700 cursor-pointer'>Sign
                    up</span>
                </p>
            </div>
        </div>
    );
};

export default Splash;

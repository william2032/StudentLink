import React from 'react';

const Splash = () => {
    return (
        <div className=" flex  md:max-w-screen-xl  md:mx-auto   mt-10  relative overflow-hidden">
            <div
                className="w-1/2 bg-gradient-to-r from-[#011638] to-[#53387E] bg-[#15121C]/50 text-white p-10 backdrop-blur-md h-[90vh] rounded-2xl">
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
                className="max-w-4xl w-full flex flex-col  justify-center  bg-[#F6F8FF] mx-4 rounded-2xl">
                <div className="justify-start my-4 flex ml-[25px]">
                    <h2 className="text-3xl  font-bold">Welcome</h2>
                </div>

                <div className="flex space-x-4 mt-6 items-center justify-center">
                    {/*students*/}
                    <div className="flex items-center">
                        <div
                            className="bg-[#53387E] text-white w-[238px] h-[243px] flex flex-col justify-center items-center rounded-[15px]">
                            <span className="text-2xl"><img src="/students.svg" alt="graduation"/></span>

                            <div>
                                <p className="mt-2 text-2xl">Students</p>
                                <button className="mt-[30px] bg-purple-700 text-white px-4 py-2 rounded">Log in</button>
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
                                <button className="mt-[30px] bg-purple-700 text-white px-4 py-2 rounded">Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-10 items-center justify-center sign">Don't have an account? <a href="#"
                                                                                                className="text-purple-700 ">Sign
                    up</a>
                </p>
            </div>
        </div>
    );
};

export default Splash;

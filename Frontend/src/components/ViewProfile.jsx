import React, { useEffect, useState } from 'react';
import { MdOutlineVerifiedUser } from "react-icons/md";
const API_URL = "http://localhost:8080/api/moreinfo";
const api_url = "http://localhost:8080/api/studentschool";

const ViewProfileForm = ({handleUpdateProfile, handleCloseModal,studentId,firstname,lastname,username,email }) => {
        const [admissionNo, setAdmissionNo] = useState('');
        const [programStudy, setProgramStudy] = useState('');
        const [skillname, setSkillname] = useState('');
        const [skillDescription, setSkillDescription] = useState('');
        const [interests, setInterests] = useState('');
        const [interestDescription, setInterestDescription] = useState('');
        const [socialLinks, setSocialLinks] = useState('');
        const [fetchstate, setfetchstate] = useState({
            dataFetched: false,
        });

        useEffect(() => {
          const fetchUserData = async () => {
              try {
                  const response = await fetch(`${API_URL}/${studentId}`); // Make the API call
                  console.log("API Response:", response); // Debugging log
                  if (!response.ok) {
                      console.error(`No user data found for studentId: ${studentId}, status: ${response.status}`);
                      return; // Exit the function if there's an error
                  }
      
                  const data = await response.json(); // Parse the JSON response
                  console.log("User data fetched successfully:", data); // Debugging log
                  setAdmissionNo(data.admissionNo);
                  setProgramStudy(data.programStudy);
                  setSkillname(data.skillname);
                  setSkillDescription(data.skilldescription);
                  setInterests(data.interest);
                  setInterestDescription(data.interestdescription); 
                  setSocialLinks(data.socialLink);

              } catch (error) {
                  console.error("Error fetching user data:", error);
              }
          };
    
          if (studentId) {
          fetchUserData(); }// Call the function to fetch user data
        }, [studentId]); 

        useEffect(() => {
            const fetchstudentdata = async () => {
                try {
                    const response = await fetch(`${api_url}/${admissionNo}`);
                    if (!response.ok) {
                        console.error(`No student data found for studentId: ${studentId}, status: ${response.status}`);
                        return;
                    }

                    setfetchstate({ dataFetched: true });
        
                } catch (error) {
                    console.error("Error fetching student data:", error);
                }
            }
            if(admissionNo) {
                fetchstudentdata();
            }
        },[admissionNo]);

        return (
            <div>
                <div className='flex flex-row p-2 bg-white rounded-lg profile'>
                    <div className='basis-1/3 shadow-md'>
                        <div className="w-24 h-24 rounded-full overflow-hidden ml-10 mb-8 border border-gray-300">
                            <img src="student.avatar.png" alt="student" />
                        </div>
                        <div className='ml-10 mb-8 flex items-center'>
                            <h4 className='text-purple-500 mr-2'>VERIFIED</h4>
                            {fetchstate.dataFetched && (
                            <MdOutlineVerifiedUser className='text-purple-600' size={30}/>)}
                        </div>
                        <div className='ml-10 mb-8'>
                            <h4 className='text-purple-500'>FIRST NAME</h4>
                            <p ><span className="">{firstname || 'username'}</span></p>
                        </div>
                        <div className='ml-10 mb-8'>
                            <h4 className='text-purple-500'>LAST NAME</h4>
                            <p><span className="">{lastname || 'username'}</span></p>
                        </div>
                        <div className='ml-10 mb-8'>
                            <h4 className='text-purple-500'>USER NAME</h4>
                            <p><span className="">{username || 'username'}</span></p>
                        </div>
                        <div className='ml-10 mb-8'>
                            <h4 className='text-purple-500'>E-MAIL</h4>
                            <p><span className="">{email || 'username'}</span></p>
                        </div>
                    </div>
                    <div className='basis-2/3 shadow-md p-4'>
                    <div className='ml-10 mb-8'>
                        <h4 className='text-purple-500'>Admission Number</h4>
                        <p><span className="">{admissionNo || 'username'}</span></p>
                    </div>
                    <div className='ml-10 mb-8'>
                        <h4 className='text-purple-500'>Program of Study</h4>
                        <p><span className="">{programStudy || 'username'}</span></p>
                    </div>
                    <div className='ml-10 mb-8'>
                        <h4 className='text-purple-500'>Skills</h4>
                        <p><span className="">{skillname || 'username'}</span></p>
                    </div>
                    <div className='ml-10 mb-8'>
                        <h4 className='text-purple-500'>Skill Description</h4>
                        <p><span className="">{skillDescription || 'username'}</span></p>
                    </div>
                    <div className='ml-10 mb-8'>
                        <h4 className='text-purple-500'>Interest</h4>
                        <p><span className="">{interests || 'username'}</span></p>
                    </div>
                    <div className='ml-10 mb-8'>
                        <h4 className='text-purple-500'>Interest Description</h4>
                        <p><span className="">{interestDescription || 'username'}</span></p>
                    </div>
                    <div className='ml-10 mb-8'>
                        <h4 className='text-purple-500'>Social Links</h4>
                        <a href={socialLinks} target='blank'><span className="hover:underline">{socialLinks || 'username'}</span></a>
                    </div>
                    </div>
                </div>
               <div className='mt-4'>
                <button onClick={() => {handleUpdateProfile(); handleCloseModal();}} className="btn1 hover:bg-purple-500 hover:text-white">Enhance Your profile</button>
                <button onClick={handleCloseModal} className='viewclose btn1 hover:bg-purple-500 hover:text-white'>Close</button>
               </div>
            </div>
        );
    }; 

export default ViewProfileForm;
import React, { useEffect, useState } from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { IoIosLink } from "react-icons/io";
import { MdInterests } from "react-icons/md";
const API_URL = "http://localhost:8080/api/moreinfo";


const UpdateProfileForm = ({ formData, setFormData, handleCloseModal }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [admissionNo, setAdmissionNo] = useState('');
    const [programStudy, setProgramStudy] = useState('');
    const [skillname, setSkillname] = useState('');
    const [skilldescription, setSkillDescription] = useState('');
    const [interest, setInterest] = useState('');
    const [interestdescription, setInterestDescription] = useState('');
    const [socialLink, setSocialLinks] = useState(''); 
    const [isSubmitting, setIsSubmitting] = useState(false); // Button disable state
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Disable button state
    const [successMessage, setSuccessMessage] = useState(""); // Success message state

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const updateprofile = async () => {
        try {
            const response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    admissionNo,
                    programStudy,
                    skillname,
                    skilldescription,
                    interest,
                    interestdescription,
                    socialLink,}),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const data = await response.json();
            setMoreinfo(data);
            setSuccessMessage('Data saved successfully!');
            //Delay the closemodal function
            setTimeout(() => {
                handleCloseModal();
            }, 1500);

        } catch (error) {
            console.error("Error saving data:", error);
            setSuccessMessage("Error saving data. Please try again.");
        } finally { setIsSubmitting(false); }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateprofile();
        handleCloseModal();
    }; 

    return (
        <form className="enhanceform" onSubmit={handleSubmit}>
            {currentStep === 1 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Education</h3>
                    <FaGraduationCap size={30} className="mr-2" />
                    <div className="mb-4">
                        <label className="block text-gray-700">Admission No:</label>
                        <input
                            type="text"
                            name="admissionNo"
                            value={admissionNo}
                            onChange={(e) => setAdmissionNo(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Admission No."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Program Study:</label>
                        <input
                            type="text"
                            name="programStudy"
                            value={programStudy}
                            onChange={(e) => setProgramStudy(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Program Study"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Skills</h3>
                      <GiSkills size={30} className="mr-2"/>
                    <div className="mb-4">
                        <label className="block text-gray-700">Skill Name:</label>
                        <input
                            type="text"
                            name="skillname"
                            value={skillname}
                            onChange={(e) => setSkillname(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Skill name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Skill Description:</label>
                        <input
                            type="text"
                            name="skillDescription"
                            value={skilldescription}
                            onChange={(e) => setSkillDescription(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Skills description"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}
            {currentStep === 3 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Interests</h3>
                      <MdInterests size={30} className="mr-2" />
                    <div className="mb-4">
                        <label className="block text-gray-700">Interest:</label>
                        <input
                            type="text"
                            name="interest"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Interest"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Interest Description:</label>
                        <input
                            type="text"
                            name="interestDescription"
                            value={interestdescription}
                            onChange={(e) => setInterestDescription(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Interest description"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}
            {currentStep === 4 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Social Links</h3>
                    <IoIosLink size={30} className='mr-2' />
                    <div className="mb-4">
                        <label className="block text-gray-700">SocialLink:</label>
                        <input
                            type="text"
                            name="socialLink1"
                            value={formData.socialLink1}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Social Links"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Social Link 2:</label>
                        <input
                            type="text"
                            name="socialLink2"
                            value={formData.socialLink2}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Social Links"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button type="submit" onClick={updateprofile} className="bg-purple-500 text-white px-4 py-2 rounded">Save</button>
                    </div>

                    {successMessage && (
                        <div className="mt-4 text-green-500 text-center">
                            {successMessage}
                        </div>
                    )}


                </div>
            )}
        </form>
    );
};

export default UpdateProfileForm;
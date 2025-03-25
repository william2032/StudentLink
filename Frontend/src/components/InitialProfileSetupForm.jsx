import React, { useState } from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { IoIosLink } from "react-icons/io";
import { MdInterests } from "react-icons/md";
const API_URL = "http://localhost:8080/api/moreinfo";


const InitialProfileSetupForm = ({ formData, setFormData, handleCloseModal }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log("Form Data:", formData);
    //     handleCloseModal();
    // };
    const enhanceprofile = async () => {
        try {
            const response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            await response.json();
            console.log('Data saved successfully:');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await enhanceprofile();
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
                            value={formData.admissionNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Admission No."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Program Study:</label>
                        <input
                            type="text"
                            name="programStudy"
                            value={formData.programStudy}
                            onChange={handleChange}
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
                            value={formData.skillname}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Skill name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Skill Description:</label>
                        <input
                            type="text"
                            name="skillDescription"
                            value={formData.skillDescription}
                            onChange={handleChange}
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
                            value={formData.interest}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Interest"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Interest Description:</label>
                        <input
                            type="text"
                            name="interestDescription"
                            value={formData.interestDescription}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Interests description"
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
                        <label className="block text-gray-700">Social Link 1:</label>
                        <input
                            type="text"
                            name="socialLink1"
                            value={formData.socialLinks}
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
                            value={formData.socialLinks}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Social Links"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button type="submit" onClick={enhanceprofile} className="bg-purple-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default InitialProfileSetupForm;
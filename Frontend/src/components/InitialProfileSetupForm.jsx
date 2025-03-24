import React, { useState } from 'react';

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
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
    
            const data = await response.json();
            console.log('Data saved successfully:', data);
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
        <form onSubmit={handleSubmit}>
            {/* {currentStep === 1 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Personal Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Last Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )} */}
            {currentStep === 1 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Education</h3>
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
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <h3 className="text-lg font-bold mb-4">Skills</h3>
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
                        <label className="block text-gray-700">Skills:</label>
                        <input
                            type="text"
                            name="skills"
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
                        <label className="block text-gray-700">Interests:</label>
                        <input
                            type="text"
                            name="interests"
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
                    <div className="mb-4">
                        <label className="block text-gray-700">Social Links:</label>
                        <input
                            type="text"
                            name="socialLinks"
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
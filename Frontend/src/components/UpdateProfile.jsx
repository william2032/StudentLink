import React, { useEffect, useState } from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { IoIosLink } from "react-icons/io";
import { MdInterests } from "react-icons/md";
const API_URL = "http://localhost:8080/api/moreinfo";


const UpdateProfileForm = ({handleCloseModal,studentId}) => {
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
    const validateForm = () => {
        let newErrors = {};
    
        const fields = { admissionNo, programStudy, skilldescription, skillname, interest, interestdescription, socialLink };
        Object.keys(fields).forEach((key) => {
            if (!fields[key].trim()) {
                newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
            }
        });
    
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    useEffect(() => {
        const fields = { admissionNo, programStudy, skilldescription, skillname, interest, interestdescription, socialLink };
        const allFieldsFilled = Object.values(fields).every((value) => value.trim() !== "");
        setIsButtonDisabled(!allFieldsFilled);
    }, [admissionNo, programStudy, skilldescription, skillname, interest, interestdescription, socialLink]);
    const enhanceprofile = async () => {
        if (!validateForm()) return; // stop submission
        setIsSubmitting(true);
        setSuccessMessage(""); //reset sucess message
        
        try {
            const response = await fetch(`${API_URL}/add/${studentId}`, {
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
        await enhanceprofile();
 // Close the modal after a delay if submission is successful
        if (successMessage === "Data saved successfully!") {
            setTimeout(() => {
                handleCloseModal();
            }, 1500);
}
        
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
                        <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 btn1">Cancel</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 btn1">Next</button>
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
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 btn1">Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 btn1">Next</button>
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
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 btn1">Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-purple-500 text-white px-4 py-2 btn1">Next</button>
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
                            name="socialLinks"
                            value={socialLink}
                            onChange={(e) => setSocialLinks(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Social Links"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-500 text-white px-4 py-2 btn1">Back</button>
                        <button type="submit" 
                            className={`bg-purple-500 text-white px-4 py-2 btn1 ${isButtonDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-gray-600 btn1 "}`}
                            disabled = {isButtonDisabled || isSubmitting}
                            >
                            {isSubmitting ? (
                                <div className='flex items-center justify-center'>
                                    <div className='loader'></div>
                                    <span className='ml-2'>saving..</span>
                                </div>
                            ) : "save"}
                            </button>
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
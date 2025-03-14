import { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegisterSuccess }) => {
    const navigate = useNavigate();
    const API_URL = "http://localhost:8080/api/students";

    // State to manage form data
    function initialFormData() {
        return {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
        };
    }

    const handleLoginRedirect = () => {
        navigate("/login"); // Redirect to login page
    };
    const [formData, setFormData] = useState(initialFormData());
    const [errors, setErrors] = useState({}); // Stores validation errors
    const [isSubmitting, setIsSubmitting] = useState(false); // Button disable state
    const [successMessage, setSuccessMessage] = useState(""); // Success message state

    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Disable button state

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Remove field error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    // Validate form fields
    const validateForm = () => {
        let newErrors = {};

        // Required field validation
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
            }
        });

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Enable/Disable sign-up button based on form completion
    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");
        setIsButtonDisabled(!allFieldsFilled);
    }, [formData]);

    // Handle registration
    const handleRegister = async () => {
        if (!validateForm()) return; // Stop submission if validation fails
        setIsSubmitting(true);
        setSuccessMessage("");
        setErrors({});

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            await response.json();
            setSuccessMessage("Registration successful! Redirecting to login...");
            onRegisterSuccess();
            setTimeout(() => {
                navigate('/login');
                resetFormData();
            }, 1500)

        } catch (error) {
            console.error('Error:', error);
            setErrors({ apiError: error.message });
            setSuccessMessage("The email or username is already in use.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form data
    const resetFormData = () => {
        setFormData(initialFormData());
    };

    return (
        <>
            <div className=" w-full flex flex-row justify-center min-h-[150px] bg-gradient-to-b from-purple-500 to-purple-400  pt-[30px]  register">
                <h2 className="text-center text-3xl font-semibold mt-[10px]  text-white w-full">Create your free account</h2>

                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mt-[60px] absolute">
                    {/* Social Login Buttons */}
                    <div className="flex sm:flex-row gap-4 mb-6">
                        <button className="flex items-center justify-center w-full p-3 border rounded-lg shadow-sm bg-gray-100 hover:bg-gray-200">
                            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" /> Continue with Google
                        </button>
                    </div>
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-500">Or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: "firstname", placeholder: "Enter name", icon: <FaUser /> },
                            { name: "lastname", placeholder: "Enter last name", icon: <FaUser /> },
                            { name: "email", placeholder: "Enter email", icon: <FaEnvelope />, type: "email" },
                            { name: "username", placeholder: "Enter username", icon: <FaUser /> },
                            { name: "password", placeholder: "Enter password", icon: <FaLock />, type: "password" },
                        ].map(({ name, placeholder, icon, type = "text" }) => (
                            <div key={name} className="flex flex-col">
                                <div className={`flex items-center border rounded-lg p-2 ${errors[name] ? "border-red-500" : "border-gray-300"}`}>
                                    {icon}
                                    <input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="w-full outline-none text-black p-2"
                                    />
                                </div>
                                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Sign Up Button */}
                    <button
                        onClick={handleRegister}
                        className={`w-full py-2 mt-6 rounded-lg ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                        disabled={isButtonDisabled || isSubmitting}
                    >

                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="loader"></div>
                                <span className="ml-2">Signing Up...</span>
                            </div>
                        ) : "Sign Up"}
                    </button>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mt-4 text-green-500 text-center">
                            {successMessage}
                        </div>
                    )}

                    {/* Redirect to Login Button */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleLoginRedirect}
                            className=""
                        >
                            Already have an account? <span className="text-blue-600 hover:cursor-pointer ">Log in</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
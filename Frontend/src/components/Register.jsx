import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaApple } from "react-icons/fa";

const Register = ({ onRegisterSuccess }) => {
    const navigate = useNavigate();


    const handleLoginRedirect = () => {
        navigate("/"); // Redirect to login page
    };
    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
    const handleRegister = () => {
        if (!validateForm()) return; // Stop submission if validation fails
        setIsSubmitting(true);
        setSuccessMessage("");

        setTimeout(() => {
            setSuccessMessage("Registration successful! Redirecting...");
            setErrors({});

            setTimeout(() => {
                setIsSubmitting(false);
                navigate("/login");
            }, 1500);
        }, 1000);
    };

    return (
        <>
            <div className=" w-full flex flex-row justify-center min-h-[150px] bg-gradient-to-b from-blue-600 to-blue-400  pt-[30px]  register">
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
                            { name: "firstName", placeholder: "Enter name", icon: <FaUser /> },
                            { name: "lastName", placeholder: "Enter last name", icon: <FaUser /> },
                            { name: "email", placeholder: "Enter email", icon: <FaEnvelope />, type: "email" },
                            { name: "username", placeholder: "Enter username", icon: <FaUser /> },
                            { name: "password", placeholder: "Enter password", icon: <FaLock />, type: "password" },
                            { name: "confirmPassword", placeholder: "Enter confirm password", icon: <FaLock />, type: "password" },
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
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
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

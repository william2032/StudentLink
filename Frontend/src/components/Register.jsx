import { useEffect, useState } from "react";
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
            confirmPassword: "",
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
        //password validation
        if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
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
            <div className="w-full flex flex-row justify-center min-h-[200px] pt-10 register">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-10">
                    <h2 className="text-center text-3xl font-semibold mb-6">Welcome to StudentLink</h2>
                    <p className="text-center mb-4">Create an account</p>

                    <div className="grid grid-cols-1 gap-4 text-[15px]">
                        {[
                            { name: "firstname", placeholder: "Firstname", type: "text" },
                            { name: "lastname", placeholder: "Lastname", type: "text" },
                            { name: "username", placeholder: "Username", type: "text" },
                            { name: "email", placeholder: "Email", type: "email" },
                            { name: "password", placeholder: "Password", type: "password" },
                            { name: "confirmPassword", placeholder: "Confirm password", type: "password" },
                        ].map(({ name, placeholder, type }) => (
                            <div key={name} className="flex flex-col">
                                <label className="text-gray-700 mb-1">{placeholder}</label>
                                <div className="flex items-center relative">
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className={`w-full outline-none text-black p-2 border-b-2 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
                                    />
                                </div>
                                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Sign Up Button */}
                    <button
                        onClick={handleRegister}
                        className={`w-full py-2 mt-6 rounded-lg ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-pink-700"}`}
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
                        <button onClick={handleLoginRedirect} className="">
                            Already have an account? <span className="text-purple-500  hover:cursor-pointer">Sign in</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
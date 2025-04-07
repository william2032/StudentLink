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
        navigate("/"); // Redirect to login page
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

        // Password validation
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

            const responseData = await response.json();
            const studentId = responseData.id; // Extract student ID from the response
    
            console.log(`Student registered successfully with ID: ${studentId}`);
            setSuccessMessage("Registration successful! Redirecting to login...");
            
            // Notify parent component of the registration success and pass the ID
            if (onRegisterSuccess) {
                onRegisterSuccess();
            }
    
            setTimeout(() => {
                navigate('/'); // Redirect to login
                resetFormData();
            }, 1500); // Redirect after 1.5 seconds
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
        <div className="register-container flex flex-col md:flex-row justify-center items-stretch min-h-[100%] overflow-hidden bg-gray-800 text-white  ">
            <div className="left-section flex flex-col justify-center items-center ">
                <div className="register-form bg-gray-700 rounded-lg shadow-lg p-10 w-full max-w-md  ">
                    <h2 className="text-3xl font-extrabold mb-3 ">Register</h2>
                    <p className="mb-[40px]">Create an account</p>
                    {[
                        { name: "firstname", placeholder: "Firstname", type: "text" },
                        { name: "lastname", placeholder: "Lastname", type: "text" },
                        { name: "username", placeholder: "Username", type: "text" },
                        { name: "email", placeholder: "Email", type: "email" },
                        { name: "password", placeholder: "Password", type: "password" },
                        { name: "confirmPassword", placeholder: "Confirm password", type: "password" },
                    ].map(({ name, placeholder, type }) => (
                        <div key={name} className="flex flex-col mb-3  input-group-register">
                            <label className="text-gray-400  text-sm mt-2">{placeholder}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className={`p-2 border-b-2 ${errors[name] ? "border-red-500" : "border-gray-100"} bg-transparent text-white`}
                            />
                            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                        </div>
                    ))}

                    {/* Sign Up Button */}
                    <button
                        onClick={handleRegister}
                        className={`w-full py-2 mt-4 rounded-lg ${isButtonDisabled ? "bg-gray-600 btn1 cursor-not-allowed" : "bg-gray-600 btn1 hover:bg-purple-700"}`}
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
                    <div className="flex justify-center pt-4 relative z-10">
                        <button onClick={handleLoginRedirect} className="text-[15px]">
                            Already have an account? <span className="font-semibold ml-2 text-purple-400 cursor-pointer ">Sign in</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right-section md:w-1/2 justify-center items-center flex  mr-12  mt-5" style={{
                backgroundImage: 'url("/studentbanner.svg"), linear-gradient(to right, #4b0082, #8a2be2)',
                backgroundSize: '60%',
                backgroundPosition: 'center',
                width: '100%',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className='text-center flex flex-col justify-start items-center h-full '>
                    <h2 className="text-center   mb-6 justify-center">Welcome to <br /> <span className='font-light text-[25px]'>STUDENT LINK</span></h2>
                    <p className='text-black text-sm' style={{ fontFamily: 'Poppins, sans-serif' }}>Where we bring Opportunities to you</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
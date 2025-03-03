import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FaUser, FaLock, FaEnvelope} from "react-icons/fa";

const Register = ({onRegisterSuccess}) => {
    const navigate = useNavigate();

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
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

        // Remove field error when user starts typing
        if (errors[name]) {
            setErrors({...errors, [name]: ""});
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
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
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
        setIsSubmitting(true); // Disable button while processing
        setSuccessMessage("");// Reset submission state before navigation

        setTimeout(() => {
            setSuccessMessage("Registration successful! Redirecting...");
            setErrors({});


            setTimeout(() => {
                setIsSubmitting(false);
                navigate("/login"); // Redirect after displaying message
            }, 1500); // 2-second delay before redirection
        });
    }

    return (
        <div className="  bg-gradient-to-br from-[#1A2980]/50 to-[#26D0CE] p-[150px] register">
            <h2 className="text-center text-2xl font-bold mb-6">STUDENTLINK</h2>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-2 text-green-600 border border-green-500 rounded">
                    {successMessage}
                </div>
            )}

            {/* Input Fields with Validation */}
            {[
                {name: "firstName", placeholder: "First Name", icon: <FaUser/>},
                {name: "lastName", placeholder: "Last Name", icon: <FaUser/>},
                {name: "username", placeholder: "Username", icon: <FaUser/>},
                {name: "email", placeholder: "Enter email", icon: <FaEnvelope/>, type: "email"},
                {name: "password", placeholder: "Password", icon: <FaLock/>, type: "password"},
                {name: "confirmPassword", placeholder: "Repeat password", icon: <FaLock/>, type: "password"},
            ].map(({name, placeholder, icon, type = "text"}) => (
                <div key={name} className="mb-4">
                    <div
                        className={`flex items-center border rounded-lg p-2 ${errors[name] ? "border-red-500" : "border-gray-300"}`}>
                        {icon}
                        <input
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={formData[name]}
                            onChange={handleChange}
                            className="w-full outline-none text-black"
                        />
                    </div>
                    {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                </div>
            ))}

            {/* Sign Up Button */}
            <button
                onClick={handleRegister}
                className={`w-full py-2 rounded-lg mt-4 ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 text-white"}`}
                disabled={isButtonDisabled || isSubmitting}
            >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
        </div>
    );

};

export default Register;
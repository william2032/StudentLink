import { useState } from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [studentId, setStudentId] = useState(null);

    return (
        <Router>
            <Routes>
                {/* Login screen as the main landing page */}
                <Route path="/" element={<LoginScreen setUserName={setUserName} setStudentId={setStudentId}/>} />

                {/*admin page*/}
                <Route path="/admin" element={<Admin/>} />
                
                {/* Dashboard with nested routes */}
                <Route path="/dashboard/*" element={<Dashboard userName={userName} studentId={studentId}/>} />

                {/* Register page */}
                <Route
                 path="/register" 
                 element={
                    <Register
                        onRegisterSuccess={(userName, userEmail, studentId) => {
                            setUserName(userName);
                            setEmail(userEmail);
                            setStudentId(studentId);
                        }} 
                    />
                    } 
                />
            </Routes>
        </Router>
    );
};

// Component to handle login/register navigation
const LoginScreen = ({ setUserName, setStudentId }) => {
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();

    const handleLogin = ({name, id}) => {
        setUserName(name);
        setStudentId(id);
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center h-screen pt-[90px] p-4">
            {showRegister ? (
                <Register onRegisterSuccess={() => setShowRegister(false)} onBackToLogin={() => setShowRegister(false)} />
            ) : (
                <Login 
                    openRegister={() => navigate("/register")} 
                    onLogin={handleLogin} 
                    setUserName={setUserName} 
                    setStudentId={setStudentId}
                />
            )}
        </div>
    );
};

// Component to handle register navigation
const RegisterScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-full mt-20 pt-[100px] p-4">
            <Register onRegisterSuccess={() => navigate("/login")} onBackToLogin={() => navigate("/login")} />
        </div>
    );
};

export default App;
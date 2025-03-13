import { useState } from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Splash from "./components/Splash.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Splash screen as the main landing page */}
                <Route path="/" element={ <Splash />} />
                {/* Login route */}
                <Route path="/login" element={<LoginScreen />} />
                {/* Register route */}
                {/* <Route path="/register" element={<RegisterScreen />} /> */}
            </Routes>
        </Router>
    );
};

// Component to handle login/register navigation
const LoginScreen = () => {
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center  h-full mt-20  pt-[100px]  p-4">
            {showRegister ? (
                <Register onRegisterSuccess={() => setShowRegister(false)} onBackToLogin={() => setShowRegister(false)} />
            ) : (
                <Login openRegister={() => setShowRegister(true)} />
            )}
            <button onClick={() => navigate("/")} className="absolute top-4 left-4 text-purple-500">← Back</button>
        </div>
    );
};

// Component to handle register navigation
const RegisterScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center  h-full mt-20  pt-[100px]  p-4">
            <Register onRegisterSuccess={() => navigate("/login")} onBackToLogin={() => navigate("/login")} />
            <button onClick={() => navigate("/")} className="absolute top-4 left-4 text-purple-500">← Back</button>
        </div>
    );
};

export default App;

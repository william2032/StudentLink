import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

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
            </Routes>
        </Router>
    );
};

// Component to handle login/register navigation
const LoginScreen = () => {
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
            {showRegister ? (
                <Register onRegisterSuccess={() => setShowRegister(false)} onBackToLogin={() => setShowRegister(false)} />
            ) : (
                <Login openRegister={() => setShowRegister(true)} />
            )}
            <button onClick={() => navigate("/")} className="absolute top-4 left-4 text-purple-500">← Back</button>
        </div>
    );
};

export default App;

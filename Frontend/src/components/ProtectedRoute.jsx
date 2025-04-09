import React, { useState } from "react";
import LoginDialog from "./AdminLogin.jsx";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) {
        return <LoginDialog onLogin={() => setIsAuthenticated(true)} />;
    }

    return children;
};

export default ProtectedRoute;

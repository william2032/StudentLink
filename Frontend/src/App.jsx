import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Splash from "./components/Splash";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRegisterSuccess = () => {
    setCurrentScreen("login"); // Return to login screen
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 sec
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {currentScreen === "splash" && (
        <Splash 
          onLoginClick={() => setCurrentScreen("login")}
          onSignupClick={() => setCurrentScreen("register")}
        />
      )}
      
      {currentScreen === "login" && (
        <Login openRegister={() => setCurrentScreen("register")} />
      )}
      
      {currentScreen === "register" && (
        <Register 
          onRegisterSuccess={handleRegisterSuccess}
          onBackToLogin={() => setCurrentScreen("login")} 
        />
      )}

      {showSuccessMessage && (
        <div className="mt-4 p-3 bg-green-500 text-white rounded-lg">
          Registration successful! 🎉
        </div>
      )}
    </div>
  );
};

export default App;

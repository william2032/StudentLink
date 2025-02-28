import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRegisterSuccess = () => {
    setIsRegisterOpen(false); // Close modal
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 sec
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Login openRegister={() => setIsRegisterOpen(true)} />

      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <Register onRegisterSuccess={handleRegisterSuccess} />
          </div>
        </div>
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

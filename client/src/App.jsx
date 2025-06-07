import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ActivatePage from "./pages/ActivatePage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} /> 
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/signin" />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/user/activate/:token" element={<ActivatePage />} />
      </Routes>
    </>
  );
}

export default App;

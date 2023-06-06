import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import InnovatorDashboard from "./components/InnovatorDashboard";
import DonorDashboard from "./components/DonorDashboard";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/innovator" element={<InnovatorDashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

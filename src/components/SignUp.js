import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/userService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(email, password, name, role);
      setMessage("Signup is successful! Please");
      setSignupSuccess(true);
    } catch (error) {
      setMessage("There was an error while signing up. Please try again.");
      setSignupSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label>Role</label>
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Select role</option>
          <option value="innovator">Innovator</option>
          <option value="donor">Donor</option>
        </select>
        <button type="submit">Signup</button>
        <br /> <br />
      </form>
      {signupSuccess && (
        <div style={{ color: "green" }}>
          {message}
          <button type="button" onClick={() => navigate("/login")}>
            Log in Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;

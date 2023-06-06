import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getJwtToken } from "../services/userService";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, setProjects } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password);

      // Get JWT token first
      // const tokenResponse = await getJwtToken(email, password);
      // if (!tokenResponse.jwt) {
      //   setError("Invalid email or password");
      //   return;
      // }

      // Now use loginUser to login user
      const user = await loginUser(email, password);
      setUser(user);

      // If the user object has a projects property, set it in the context
      if (user.projects) {
        setProjects(user.projects);
      }

      if (!user) {
        setError("Invalid email or password");
      } else {
        console.log("Logged in");
        if (user.role === "innovator") {
          navigate("/innovator");
        } else if (user.role === "donor") {
          navigate("/donor");
        }
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Registered Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

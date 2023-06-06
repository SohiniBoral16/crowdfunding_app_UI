import React, { useState } from "react";
import { logoutUser as authLogout } from '../services/userService';

export const UserContext = React.createContext({
  user: null,
  projects: [],
  setProjects: () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const logout = async () => {
    await authLogout(); // call the logout function from your auth service
    setUser(null); // set the user state back to null
    setProjects([]); // clear the projects state
  };

  return (
    <UserContext.Provider value={{ user, setUser, projects, setProjects, logout }}>
      {children}
    </UserContext.Provider>
  );
};

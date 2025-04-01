import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const storedAdmin = JSON.parse(localStorage.getItem("adminUser"));
    if (storedUser) setUser(storedUser);
    if (storedAdmin) setAdmin(storedAdmin);
  }, []);

  const login = (userData) => {
    if (userData.role === "admin") {
      setAdmin(userData);
      localStorage.setItem("adminUser", JSON.stringify(userData));
    } else {
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));

      
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (!existingUsers.some((user) => user.email === userData.email)) {
        existingUsers.push(userData);
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }
    }
  };

  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("adminUser");
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

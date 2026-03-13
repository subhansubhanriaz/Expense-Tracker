
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // ✅ Load users from localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("expenseTrackerUsers");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("expenseTrackerCurrentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authNotification, setAuthNotification] = useState("");

  // ✅ Save users & currentUser to localStorage
  useEffect(() => {
    localStorage.setItem("expenseTrackerUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "expenseTrackerCurrentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("expenseTrackerCurrentUser");
    }
  }, [currentUser]);

  // Signup function
  const signup = (email, password, username) => {
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      setAuthNotification("⚠ Email already registered");
      return false;
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      username
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);

    setAuthNotification("✅ Account created successfully");
    return true;
  };

  // Signin function
  const signin = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setAuthNotification("❌ Invalid login credentials");
      return false;
    }

    setCurrentUser(user);
    setAuthNotification("✅ Login successful");
    return true;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setAuthNotification("");
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        signup,
        signin,
        logout,
        authNotification,
        setAuthNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
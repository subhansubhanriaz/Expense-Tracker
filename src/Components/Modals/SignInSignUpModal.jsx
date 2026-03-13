import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Modals.css";

const SignInSignUpModal = ({ onClose }) => {
  const { signup, signin, authNotification, setAuthNotification } = useContext(AuthContext);

  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // ✅ Clear notification when modal opens
  useEffect(() => {
    setAuthNotification("");
  }, [setAuthNotification]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let success = false;

    if (isSignIn) {
      success = signin(email, password);
    } else {
      success = signup(email, password, username);
    }

    if (success) {
      // ✅ Reset fields
      setEmail("");
      setPassword("");
      setUsername("");

      // ✅ Close modal automatically
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card auth-card">
        <button className="close-btn" onClick={onClose}>X</button>

        <h2>{isSignIn ? "Welcome Back 👋" : "Create Account"}</h2>

        {authNotification && (
          <div className={`auth-alert ${authNotification.includes("❌") || authNotification.includes("⚠") ? "error" : "success"}`}>
            {authNotification}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {!isSignIn && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p
          className="toggle-link"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn
            ? "Create new account"
            : "Already have an account?"
          }
        </p>
      </div>
    </div>
  );
};

export default SignInSignUpModal;

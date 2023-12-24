import React, { useState } from "react";

export default function Login({ loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Perform login logic here using Phoenix backend
    try {
      const response = await fetch(
        "http://localhost:4000/web_api/users/log_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        // Login successful, redirect to dashboard
        window.location.href = "/";
      } else {
        // Login failed, display error message
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.log("An error occurred during login:", error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
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
      <button
        className="bg-blue-500"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const validateForm = () => {
    if (!email) {
      setError("Please enter email address.");
      return false;
    }
    if (!password) {
      setError("Please enter password.");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const isValidEmail = (value) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          console.log("Login successful:", data);
          setResult(`Token: ${data.token}`);
        } else {
          console.log("Login failed:", response.status);
          setResult(`Login Failed : ${data.error}`);
        }
      } catch (error) {
        console.log("Error occurred:", error);
      }
    }
  };

  const handleChange = (e) => {
    validateForm();
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        return;
      case "password":
        setPassword(e.target.value);
        return;
      default:
        return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Please Sign In to Emerald!!!</p>
      <div>
        <input
          type="email"
          value={email}
          name="email"
          placeholder="Enter your email address"
          onChange={handleChange}
          data-testid="email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          data-testid="password"
        />
      </div>
      <span>
        {error && (
          <div className="error" data-testid="error">
            {error}
          </div>
        )}
      </span>
      <span data-testid="result">
        {result && (
          <div className="result" data-testid="result-text">
            {result}
          </div>
        )}
      </span>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPICall } from "./AuthService";
import "./Register.css";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegistrationForm = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrors({ general: "All fields are required!" });
      return;
    }

    const register = { name, email, password };

    try {
      const response = await registerAPICall(register);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({
          general: "An error occurred during registration. Please try again.",
        });
      }
      console.error(error);
    }
  };

  return (
      <div>
        <br /> <br />
        <div className="register-container">
          <div className="row">
            <h2>Register</h2>
            <div>
              <form onSubmit={handleRegistrationForm}>
                <div className="label-container">
                  <label>Name</label>
                  <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>

                <div className="label-container">
                  <label>Email</label>
                  <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <div className="label-container">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>
                {errors.general && (
                    <p style={{ color: "red" }}>{errors.general}</p>
                )}
                <button className="button" type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RegisterComponent;

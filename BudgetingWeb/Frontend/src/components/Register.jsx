import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerAPICall} from "./AuthService";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleRegistrationForm = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setErrors({general: "All fields are required!"});
            return;
        }

        const register = {name, email, password};

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
            <div className="register-container">
                <div className="row">
                    <h2>Register</h2>
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
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>
                        <div className="label-container">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
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
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>
                        {errors.general && <p className="error-message">{errors.general}</p>}
                        <button className="regbutton">Register</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ClientUpdate.css"; // Make sure to import the CSS file

const UpdateClient = () => {
    const { clientId } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchClientDetails();
    }, [clientId]);

    const fetchClientDetails = async () => {
        try {
            const clientResponse = await axios.get(
                `http://localhost:8080/api/clients/get/${clientId}`
            );
            setName(clientResponse.data.name);
            setEmail(clientResponse.data.email);
            setError("");
        } catch (err) {
            setError("Error fetching client details: " + err.message);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validateEmail(email)) {
            setErrors({ email: "Invalid email format" });
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/clients/update/email/${clientId}`,
                { email }
            );
            console.log("Email update successful:", response.data);
            navigate(`/client-details/${clientId}`); // Redirect back to the details page
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({
                    general:
                        "An error occurred during the email update. Please try again.",
                });
            }
            console.error("Error updating email:", error);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validatePassword(password)) {
            setErrors({
                password:
                    "Password must be at least 8 characters long and include at least one digit, one uppercase letter, one lowercase letter, and one special character",
            });
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/clients/update/password/${clientId}`,
                { password }
            );
            console.log("Password update successful:", response.data);
            navigate(`/client-details/${clientId}`); // Redirect back to the details page
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({
                    general:
                        "An error occurred during the password update. Please try again.",
                });
            }
            console.error("Error updating password:", error);
        }
    };

    return (
        <div>
            <br /> <br />
            <div className="client-details-container">
                <div className="row">
                    <h2>Update Client Details</h2>
                    <div className="update-form">
                        <form onSubmit={handleEmailChange}>
                            <div className="label-container">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter new email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                            </div>
                            <button className="button" type="submit">
                                Update Email
                            </button>
                        </form>
                        <form onSubmit={handlePasswordChange} style={{ marginTop: "20px" }}>
                            <div className="label-container">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                    <p style={{ color: "red" }}>{errors.password}</p>
                                )}
                            </div>
                            <button className="button" type="submit">
                                Update Password
                            </button>
                        </form>
                        {errors.general && (
                            <p style={{ color: "red", marginTop: "20px" }}>
                                {errors.general}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateClient;

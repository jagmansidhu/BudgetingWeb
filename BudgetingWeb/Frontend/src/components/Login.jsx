import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {loginAPICall} from './AuthService';
import './Register.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginForm = async (e) => {
        e.preventDefault();

        try {
            const response = await loginAPICall(email, password);
            console.log(response.data);

            localStorage.setItem('userId', response.data.id);

            navigate(`/transactions/${response.data.id}`);

            window.location.reload();
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div>
            <div className="login-container">
                <div className="row">
                    <h2>Login</h2>
                    <form onSubmit={handleLoginForm}>
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
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button className="logbutton">Login</button>
                        <button
                            className="logbutton"
                            type="button"
                            onClick={handleRegisterRedirect}
                        >
                            Don't have an account?
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;

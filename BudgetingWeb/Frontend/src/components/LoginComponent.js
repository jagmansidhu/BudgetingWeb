import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {loginAPICall} from './AuthService';
import './Register.css';

const LoginComponent = () => {
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
                    <div>
                        <div>
                            <h2>Login</h2>
                        </div>
                        <div>
                            <form>
                                <div className="label-container">
                                    <label>Email</label>
                                    <div>
                                        <input
                                            type='text'
                                            name='email'
                                            className="form-control"
                                            placeholder='Enter email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="label-container">
                                    <label>Password</label>
                                    <div>
                                        <input
                                            type='password'
                                            name='password'
                                            className="form-control"
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <div>
                                    <button className="logbutton" onClick={handleLoginForm}>Login</button>
                                </div>
                                <div>
                                    <button className="logbutton" type='button' onClick={handleRegisterRedirect}>
                                        Don't have an account? Register here
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerAPICall} from "./AuthService";
import './Register.css'

const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegistrationForm = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setErrorMessage("All fields are required!");
            return;
        }

        const register = {name, email, password};

        console.log(register);

        try {
            const response = await registerAPICall(register);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div>
            <br/> <br/>
            <div className='register-container'>
                <div className='row'>
                    <h2>Register</h2>
                    <div>
                        <form>
                            <div className='label-container'>
                                <label>Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    className='form-control'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className='label-container'>
                                <label>Email</label>
                                <input
                                    type='text'
                                    name='email'
                                    className='form-control'
                                    placeholder='Enter email address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className='label-container'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    className='form-control'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                            <button className="button" onClick={handleRegistrationForm}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;

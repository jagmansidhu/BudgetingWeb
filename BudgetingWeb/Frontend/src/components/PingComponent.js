import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PingComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPing = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clients/ping');
                setMessage(response.data);
            } catch (error) {
                setMessage('Error connecting to backend: ' + error.message);
            }
        };

        fetchPing();
    }, []);

    return (
        <div>
            <h2>Ping Result</h2>
            <p>{message}</p>
        </div>
    );
};

export default PingComponent;

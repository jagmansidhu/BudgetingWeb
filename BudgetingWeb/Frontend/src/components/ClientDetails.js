import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Transactions.css';  // Importing the CSS file

const ClientDetails = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchClientDetails();
    }, [clientId]);

    const fetchClientDetails = async () => {
        try {
            const clientResponse = await axios.get(`http://localhost:8080/api/clients/get/${clientId}`);
            setClient(clientResponse.data);

            setError('');
        } catch (err) {
            setClient(null);
            setError('Error fetching client details: ' + err.message);
        }
    };

    return (
        <div className="ClientDetails">
            {error && <p>{error}</p>}
            {client && (
                <div className="detail-container">
                    <div className="client-info">
                        <h4 className="heading"><strong>Client Details - </strong></h4>
                        <h4 className="heading"><strong>Name:</strong> {client.name}</h4>
                        <h4 className="heading"><strong>Email:</strong> {client.email}</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDetails;

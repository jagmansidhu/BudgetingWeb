import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ClientDetails = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
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
            setClient(clientResponse.data);
            setError("");
        } catch (err) {
            setClient(null);
            setError("Error fetching client details: " + err.message);
        }
    };

    return (
        <div className="ClientDetails">
            {error && <p>{error}</p>}
            {client && (
                <div className="detail-container">
                    <div className="client-info">
                        <h4 className="heading">
                            <strong>Client Details - </strong>
                        </h4>
                        <h4 className="heading">
                            <strong>Name:</strong> {client.name}
                        </h4>
                        <h4 className="heading">
                            <strong>Email:</strong> {client.email}
                        </h4>
                    </div>
                    <div>
                        <Link to={`/update-client/${clientId}`}>
                            <button className="button">Update</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDetails;

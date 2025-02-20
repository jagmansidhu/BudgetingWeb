import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./ClientDetails.css"
import apiRoutes from "./config";

const ClientDetails = () => {
    const {clientId} = useParams();
    const [client, setClient] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const clientResponse = await axios.get(
                    `${apiRoutes.clients}/get/${clientId}`
                );
                setClient(clientResponse.data);
                setError("");
            } catch (err) {
                setClient(null);
                setError("Error fetching client details: " + err.message);
            }
        };
        fetchClientDetails();
    }, [clientId]);

    return (
        <div className="ClientDetails">
            {error && <p>{error}</p>}
            {client && (
                <div className="detail-container">
                    <div>
                        <h4 className="heading">
                            <strong>Name:</strong> {client.name}
                        </h4>
                        <h4 className="heading">
                            <strong>Email:</strong> {client.email}
                        </h4>
                    </div>
                    <div>
                        <Link to={`/update-client/${clientId}`}>
                            <button className="client-info">Update</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDetails;

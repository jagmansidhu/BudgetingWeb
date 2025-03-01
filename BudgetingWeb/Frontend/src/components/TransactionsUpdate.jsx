import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import './TransactionsUpdate.css';
import apiRoutes from "./config";


const TransactionsUpdate = () => {
    const {clientId, transactionId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (location.state && location.state.transaction) {
            const {amount, comment, date, category} = location.state.transaction;
            setAmount(amount);
            setComment(comment);
            setDate(date);
            setCategory(category)
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `${apiRoutes.transactions}/${clientId}/update/${transactionId}`;
            console.log("Updating transaction with URL:", url);
            const transaction = {
                amount: parseInt(amount, 10),
                comment: comment,
                date: date,
                category: category
            };
            await axios.put(url, transaction, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResponse('Transaction updated successfully!');
            // Redirect back to client details page after successful update
            navigate(`/transactions/${clientId}`);
        } catch (error) {
            setResponse('Error updating transaction: ' + error.message);
            console.error("Network Error:", error);
        }
    };

    return (
        <div className="transactions">
            <form onSubmit={handleSubmit}>
                <div className="each">
                    <label>Category</label>
                    {/*<input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>*/}
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Dining">Dining</option>
                        <option value="Fun">Fun</option>
                        <option value="Health">Health</option>
                        <option value="Misc">Misc</option>
                    </select>
                </div>
                <div className="each">
                    <label>Amount</label>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className="each">
                    <label>Comment</label>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                </div>
                <div className="date">
                    <label>Date</label>
                    <input className="date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    <button className="transaction-button" type="submit">Update Transaction</button>
                </div>
            </form>
            <p>{response}</p>
        </div>
    );
};

export default TransactionsUpdate;

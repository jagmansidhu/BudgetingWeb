import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./AddTransaction.css"

const AddTransaction = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost:8080/api/transactions/${clientId}`;
            const transaction = {
                amount: parseInt(amount, 10),
                comment: comment,
                date: date,
                category: category
            };
            await axios.post(url, transaction, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResponse('Transaction added successfully!');
            // Redirect back to client details page after a successful transaction
            navigate(`/transactions/${clientId}`);
        } catch (error) {
            setResponse('Error adding transaction: ' + error.message);
        }
    };

    return (
        <div className="transactions">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div>
                    <label>Amount</label>
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div>
                    <label>Comment</label>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                </div>
                <div className="date">
                    <label>Date</label>
                    <input className="date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <button className="transaction-button" type="submit">Add Transaction</button>
            </form>
            <p>{response}</p>
        </div>
    );
};

export default AddTransaction;

import React, {useState} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import "./TransactionsUpdate.css";
import apiRoutes from "./config";


const AddTransaction = () => {
    const {clientId} = useParams();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `${apiRoutes.transactions}/${clientId}`;
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
                <button className="transaction-button" type="submit">Add Transaction</button>
            </form>
            <p>{response}</p>
        </div>
    );
};

export default AddTransaction;

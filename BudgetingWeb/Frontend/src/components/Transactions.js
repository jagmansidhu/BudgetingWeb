import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import './Transactions.css';

const Transactions = () => {
    const {clientId} = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const clientResponse = await axios.get(`http://localhost:8080/api/clients/get/${clientId}`);
                setClient(clientResponse.data);

                const transactionsResponse = await axios.get(`http://localhost:8080/api/transactions/${clientId}`);
                const transactionsData = transactionsResponse.data;
                setTransactions(transactionsData);
                setFilteredTransactions(transactionsData);

                const total = transactionsData.reduce((sum, transaction) => sum + transaction.amount, 0);
                setTotalAmount(total);

                setError('');
            } catch (err) {
                setClient(null);
                setTransactions([]);
                setFilteredTransactions([]);
                setTotalAmount(0);
                setError('Error fetching client details: ' + err.message);
            }
        };
        fetchClientDetails();
    }, [clientId]);

    const handleMonthChange = (event) => {
        const month = event.target.value;
        setSelectedMonth(month);
        filterTransactionsByMonth(month);
    };

    const filterTransactionsByMonth = (month) => {
        let filtered = [];
        if (month === '') {
            filtered = transactions;
        } else {
            filtered = transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                return transactionDate.getMonth() === parseInt(month, 10);
            });
        }
        setFilteredTransactions(filtered);

        const total = filtered.reduce((sum, transaction) => sum + transaction.amount, 0);
        setTotalAmount(total);
    };

    const handleUpdateClick = (transaction) => {
        navigate(`/update-transaction/${clientId}/${transaction.id}`, {state: {transaction}});
    };

    const handleDeleteClick = async (transactionId) => {
        try {
            const url = `http://localhost:8080/api/transactions/${clientId}/delete/${transactionId}`;
            await axios.delete(url);
            const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
            setTransactions(updatedTransactions);
            filterTransactionsByMonth(selectedMonth);
            window.location.reload();
        } catch (err) {
            setError('Error deleting transaction: ' + err.message);
        }
    };

    const handleAddTransactionClick = () => {
        navigate(`/add-transaction/${clientId}`);
    };


    return (
        <div className="transactions-container">
            {error && <p>{error}</p>}
            <div className="actions-container">
                <button className="transaction-button" onClick={handleAddTransactionClick}>Add Transaction</button>
                <div className="filter-container">
                    <select className="transaction-button" id="month" value={selectedMonth}
                            onChange={handleMonthChange}>
                        <option value="">All Months</option>
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                </div>
            </div>
            {filteredTransactions.length > 0 && (
                <div className="all-transactions">
                    <h3>Transactions</h3>
                    {filteredTransactions.map(transaction => (
                        <div className="each-transaction" key={transaction.id}>
                            <div className="transaction-info">
                                <p className="transaction-item">
                                    <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                                <p className="transaction-item"><strong>Amount:</strong> {transaction.amount}</p>
                                <p className="transaction-item"><strong>Comment:</strong> {transaction.comment}</p>
                                <p className="transaction-item"><strong>Category:</strong> {transaction.category}</p>
                            </div>
                            <div>
                                <button className="item-button" onClick={() => handleUpdateClick(transaction)}>
                                    Update
                                </button>
                                <button className="item-button"
                                        onClick={() => handleDeleteClick(transaction.id)}>Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="total-amount">
                        <hr/>
                        <h5>Total Amount: ${totalAmount.toFixed(2)}</h5>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;

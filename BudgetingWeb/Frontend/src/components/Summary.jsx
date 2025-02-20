import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Summary.css';
import apiRoutes from "./config";

const Summary = () => {
    const { clientId } = useParams();
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMonthlySummary = async () => {
            try {
                const response = await axios.get(`${apiRoutes.transactions}/${clientId}/monthlyData`);
                setMonthlySummary(response.data);
            } catch (err) {
                setError('Error fetching summary data: ' + err.message);
            }
        };

        fetchMonthlySummary();
    }, [clientId]);

    const chartData = {
        labels: monthlySummary.map((item) => item.month),
        datasets: [
            {
                label: 'Total Spending ($)',
                data: monthlySummary.map((item) => item.totalAmount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Spending ($)',
                },
            },
        },
    };

    return (
        <div className="summary-container">
            {error && <p className="error-message">{error}</p>}
            <h2>Monthly Spending Summary</h2>

            {monthlySummary.length === 0 ? (
                <p>No summary data available.</p>
            ) : (
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default Summary;

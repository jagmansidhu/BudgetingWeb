import React, {useEffect, useState} from 'react';


import HeaderComponent from "./components/HeaderComponent";
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import PingComponent from "./components/PingComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import SummaryComponent from "./components/SummaryComponent";
import Transactions from "./components/Transactions";
import TransactionsUpdate from "./components/TransactionsUpdate";
import AddTransaction from "./components/AddTransaction";
import ClientUpdate from "./components/ClientUpdate";
import ClientDetails from "./components/ClientDetails";
import './App.css';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div>
            <HeaderComponent isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginComponent/>}/>
                    <Route path="/register" element={<RegisterComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route exact path="/ping" element={<PingComponent/>}/>
                    <Route
                        path="/transactions/summary/:clientId"
                        element={
                            <ProtectedRoute>
                                <SummaryComponent/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transactions/:clientId"
                        element={
                            <ProtectedRoute>
                                <Transactions/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-transaction/:clientId/:transactionId"
                        element={
                            <ProtectedRoute>
                                <TransactionsUpdate/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-transaction/:clientId"
                        element={
                            <ProtectedRoute>
                                <AddTransaction/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-client/:clientId"
                        element={
                            <ProtectedRoute>
                                <ClientUpdate/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/client-details/:clientId"
                        element={
                            <ProtectedRoute>
                                <ClientDetails/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;

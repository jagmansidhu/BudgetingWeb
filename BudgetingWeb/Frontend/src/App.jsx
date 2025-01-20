import React, {useEffect, useState} from 'react';


import Header from "./components/Header";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Ping from "./components/Ping";
import Protected from "./components/Protected";
import SummaryComponent from "./components/Summary";
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
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <div>
                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    {/*<Route exact path="/ping" element={<Ping/>}/>*/}
                    <Route
                        path="/transactions/:clientId"
                        element={
                            <Protected>
                                <Transactions/>
                            </Protected>
                        }
                    />
                    <Route
                        path="/summary/:clientId"
                        element={
                            <Protected>
                                <SummaryComponent/>
                            </Protected>
                        }
                    />
                    <Route
                        path="/update-transaction/:clientId/:transactionId"
                        element={
                            <Protected>
                                <TransactionsUpdate/>
                            </Protected>
                        }
                    />
                    <Route
                        path="/add-transaction/:clientId"
                        element={
                            <Protected>
                                <AddTransaction/>
                            </Protected>
                        }
                    />
                    <Route
                        path="/update-client/:clientId"
                        element={
                            <Protected>
                                <ClientUpdate/>
                            </Protected>
                        }
                    />
                    <Route
                        path="/client-details/:clientId"
                        element={
                            <Protected>
                                <ClientDetails/>
                            </Protected>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';

const Orders = () => {
    const location = useLocation();
    const [allorders, setOrders] = useState([]);
    const { email } = location.state || {};  
   
    useEffect(() => {
        if (email) {
            fetchOrders();
        }
    }, [email]); 

    const fetchOrders = async () => {
        const obj = { email: email };

        const response = await fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });

        if (response.ok) {
            const backendOrders = await response.json();
     
            setOrders(backendOrders.filter(order => order != null)); 
            console.log("Here are the Orders: ", backendOrders); 
        } else {
            alert("There was some error fetching orders");
        }
    };

    return (
        <>
            <Nav />

            <div style={styles.container}>
                <h1 style={styles.header}>{email ? email : "No email provided"}</h1>
                <h2 style={styles.ordersTitle}>Orders</h2>

                {allorders.length > 0 ? (
                    <div style={styles.ordersList}>
                        {allorders.map((order, index) => (
                            <div key={index} style={styles.orderCard}>
                                <h3 style={styles.orderNumber}>Order #{index + 1}</h3>
                                <p><strong>Request From:</strong> {order.RequestFrom}</p>
                                <p><strong>Need Description:</strong> {order.NeedDescription}</p>
                                <p><strong>Date Requested:</strong> {new Date(order.DateRequested).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={styles.noOrdersMessage}>No orders found</p>
                )}
            </div>
        </>
    );
};

const styles = {
    container: {
        padding: '40px',
        maxWidth: '900px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        fontSize: '28px',
        marginBottom: '15px',
        fontWeight: 'bold',
    },
    ordersTitle: {
        textAlign: 'center',
        color: '#555',
        fontSize: '22px',
        marginBottom: '25px',
    },
    ordersList: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '30px',
        marginTop: '20px',
    },
    orderCard: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    },
    orderCardHover: {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    orderNumber: {
        color: '#0066cc',
        fontSize: '20px',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    noOrdersMessage: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#888',
        marginTop: '30px',
    },
};

export default Orders;

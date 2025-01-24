import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const RequestPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [freelancerEmail, setFreelancerEmail] = useState('');
    const [needDescription, setNeedDescription] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [paymentInProgress, setPaymentInProgress] = useState(false);

    const location = useLocation();
    const { FreelancerName, customerName } = location.state || {};

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchClientSecret = async () => {
            const response = await fetch('http://localhost:5000/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 1000 }),
            });
            const data = await response.json();
            setClientSecret(data.clientSecret);
        };

        fetchClientSecret();
    }, [FreelancerName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            customerName,
            FreelancerName,
            needDescription,
        };

        console.log('Form Data Submitted:', formData);

        const response = await fetch("http://localhost:5000/request", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const response_backend = await response.json();
        alert(response_backend.message);

        setUserEmail('');
        setFreelancerEmail('');
        setNeedDescription('');
    };

    const handlePayAdvance = async () => {
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setPaymentInProgress(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: userEmail,
                },
            },
        });

        if (error) {
            alert('Payment failed: ' + error.message);
        } else if (paymentIntent.status === 'succeeded') {
            alert('Payment Successful!');
        }

        setPaymentInProgress(false);
    };

    return (
        <div style={styles.container}>
            <h2>Request an Order</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="userEmail" style={styles.label}>
                        Your Email:
                    </label>
                    <input
                        type="email"
                        id="userEmail"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="freelancerEmail" style={styles.label}>
                        Freelancer's Email:
                    </label>
                    <input
                        type="email"
                        id="freelancerEmail"
                        value={FreelancerName}
                        style={styles.input}
                        required
                        disabled
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="needDescription" style={styles.label}>
                        Define your need (in brief):
                    </label>
                    <textarea
                        id="needDescription"
                        value={needDescription}
                        onChange={(e) => setNeedDescription(e.target.value)}
                        style={styles.textarea}
                        required
                    />
                </div>

                {clientSecret && (
                    <div style={styles.cardElementContainer}>
                        <CardElement options={{ hidePostalCode: true }} />
                    </div>
                )}

                <div style={styles.buttonContainer}>
                    <button type="submit" style={styles.submitButton}>
                        Submit Request
                    </button>
                    <button
                        type="button"
                        style={styles.payButton}
                        onClick={handlePayAdvance}
                        disabled={paymentInProgress}
                    >
                        Pay Advance
                    </button>
                </div>
                <div class="alert alert-success" role="alert">
                    Paying in advance helps ensure a quicker response and faster turnaround from the freelancer.
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        backgroundColor: '#f4f4f9',
        padding: '20px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        height: '100px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    submitButton: {
        backgroundColor: '#3e64ff',
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontSize: '16px',
        width: '48%',
    },
    payButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontSize: '16px',
        width: '48%',
    },
    cardElementContainer: {
        marginTop: '15px',
    },
};

export default RequestPage;

import React from 'react';
import '../ComponentsStyle/Card.css'; // Import the CSS file for styling

const Card = ({ name, email, profession, hourlyRate, deliveryExpectTime }) => {
  return (
    <div className="user-card">
      <div className="card-content">
        <h2 className="user-name">{name}</h2>
        <p className="user-email"><strong>Email:</strong> {email}</p>
        <p className="user-profession"><strong>Profession:</strong> {profession}</p>
        <p className="user-rate"><strong>Hourly Rate:</strong> ${hourlyRate}</p>
        <p className="user-delivery-time"><strong>Delivery Expected:</strong> {deliveryExpectTime} days</p>
      </div>
    </div>
  );
};

export default Card;

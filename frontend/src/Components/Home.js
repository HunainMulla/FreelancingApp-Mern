import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Card from './Card';
import '../ComponentsStyle/Home.css';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';
import { useSelector, useDispatch } from 'react-redux';
import store from './Store';

const Home = () => {
  const user_name = useSelector((state) => state.userDetail.value);
  const user = useSelector((state) => state.islogged.value);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const [name, setName] = useState("");

  async function handleViewProfile(email) { 
    navigate('/some', { state: { email: email } });
  }

  useEffect(() => {
    console.log(user_name.name);
    if (!user) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/home", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleRequestFromUser(FreeLancername, customerName) {
    let data = {
      FreelancerName: FreeLancername,
      customerName: customerName,
    };

    if (FreeLancername == customerName) {
      alert("Cannot send request to own account");
      return;
    }

    navigate("/request", { state: { FreelancerName: FreeLancername, customerName: customerName } });
  }

  const filteredData = data.filter((item) => item.profession && item.profession.trim() !== "");

  return (
    <div>
      <h1>FreeLancer's</h1>
      <br />
      {flag && (
        <div className="cards-container">
          {filteredData.map((item, index) => (
            <div key={index}>
              <Card
                email={item.email}
                profession={item.profession}
                hourlyRate={item.rate}
                deliveryExpectTime={item.delivery}
                description={item.description}
              />
              <button className="btn btn-outline-success sm mx-3 btn-sm" onClick={() => handleRequestFromUser(item.email, user_name.name)}>Request Service</button>
              <button className="btn btn-outline-success btn-sm" onClick={() => handleViewProfile(item.email)}>View Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Home);

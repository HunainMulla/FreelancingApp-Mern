
import React, { useState,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { correct } from './Components/loginSlice';
import './ComponentsStyle/FormStyle.css';
import { setname, setUserDetailFromLocalStorage } from './Components/userDetailSlice';
import { UserContext } from './App';
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [freelancerEmail, setFreelancerEmail] = useState('');
  const [freelancerPass, setFreelancerPass] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  const handleFreelancerSubmit = async (event) => {
    event.preventDefault();
    
    let data = {
      email: freelancerEmail,
      password: freelancerPass,
    };
    dispatch(setname(freelancerEmail))
    try {
      const response = await fetch("http://localhost:5000/form/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);


  
        dispatch(correct());
        // dispatch(setUserDetailFromLocalStorage());
        navigate('/');
      } else {
        console.log("Failed to login");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };



  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h1>Welcome Back!</h1>
        <form onSubmit={handleFreelancerSubmit}>
          <input
            type="text"
            placeholder="Freelancer Email"
            value={freelancerEmail}
            onChange={(e) => setFreelancerEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={freelancerPass}
            onChange={(e) => setFreelancerPass(e.target.value)}
          />
          <button type="submit">Freelancer Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

    import React, { useState } from 'react';
    import './ComponentsStyle/SignUp.css';
    import { setname } from './Components/userDetailSlice';
    import { useDispatch } from 'react-redux';
    import { useNavigate } from 'react-router';
    import { correct } from './Components/loginSlice';
    import Nav from './Components/Nav';

    const SignUp = () => {
        let navigate = useNavigate();
        const [Userpassword, setUserPassword] = useState("");
        const [Useremail, setUserEmail] = useState("");
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        const [profession, setProfession] = useState(null);
        const [hourlyRate, setHourlyRate] = useState("");
        const [deliveryExpectTime, setDeliveryExpectTime] = useState("");
        const [description, setDescription] = useState("Write About your skills (e.g., if you are a web developer, 'Mern Stack')");
        const [type, setType] = useState(true); 

    
        let dispatch = useDispatch();

        const handleSubmitFreeLancer = async (event) => {
            event.preventDefault();
            dispatch(correct());

            if (!email || !password || !profession || !hourlyRate || !deliveryExpectTime || !description) {
                alert('Please fill all the fields');
                return;
            }

            let data = {
                userEmail: email,
                userPassword: password,
                profession: profession,
                hourlyRate: hourlyRate,
                deliveryExpectTime: deliveryExpectTime,
                type: type,
                description: description,
                requests: 0,
                orders: []
            };

            dispatch(setname(email));

            console.log('Data to send:', data);

            try {
                const response = await fetch("http://localhost:5000/form/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.message);
                    // alert("The Desc about the freelancer is ", description);
                    window.location.replace('./');
                } else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                    alert(errorData.message);
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('There was an error during the signup process. Please try again.');
            }
        };

        
        async function handleSubmitUser(e) {
            e.preventDefault();
            console.log(Useremail, Userpassword);
            dispatch(setname(Useremail))
            dispatch(correct())
            let obj = {
                email: Useremail,
                password: Userpassword,
                type: false
            };

            const backend_response = await fetch("http://localhost:5000/form/signupUser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            });

            let response = await backend_response.json();
            alert(response.message);

            if(response.ok)
            {
                window.location.replace('/')

            }
            else{ 
                alert("Try Logging In")
            }
            
        }

        return (
            <>
        

                <div className="form-container">
                
                    <form onSubmit={handleSubmitFreeLancer} className="form freelancer-form">
                        <h1>Sign Up As Freelancer</h1>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required={true}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                    
                        <select
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="select-input"
                        >
                            <option value="">Select Profession</option>
                            <option value="Web Developer">Web Developer</option>
                            <option value="ML Engineer">ML Engineer</option>
                            <option value="Content Writer">Content Writer</option>
                            <option value="Excel Expert">Excel Expert</option>
                            <option value="Other" disabled={true}>More Profession's Would be Added Soon...</option>
                        </select>

                        <input
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            placeholder="Hourly Rate"
                        />
                        <input
                            type="number"
                            value={deliveryExpectTime}
                            onChange={(e) => setDeliveryExpectTime(e.target.value)}
                            placeholder="Delivery Time Expectation"
                        />

                    
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />

                        <button type="submit">Sign Up</button>
                    </form>

                
                    <form onSubmit={handleSubmitUser} className="form customer-form">
                        <h1>Sign Up As Customer</h1>
                        <input
                            type="text"
                            value={Useremail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={Userpassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </>
        );
    };

    export default SignUp;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FreeLancerProfile = () => {
    const user_name = useSelector((state)=>state.userDetail.value)
    const location = useLocation();
    const { email } = location.state || {};  
    const navigate = useNavigate();  

   
    const [userEmail, setUserEmail] = useState("Loading...");
    const [rate, setRate] = useState("Loading...");
    const [delivery, setDelivery] = useState("Loading...");
    const [desc, setDesc] = useState("Loading...");
    const [pro, setPro] = useState("Loading...");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    async function handleViewProfile() {
        let obj = { email: email }; 

        try {
            const response = await fetch("http://localhost:5000/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                const backend_response = await response.json();

               
                setUserEmail(backend_response.email);
                setDesc(backend_response.description);
                setPro(backend_response.profession);
                setRate(backend_response.rate);
                setDelivery(backend_response.delivery);
                setLoading(false); 
            } else {
                setError("Error fetching data from the server.");
                setLoading(false);
            }
        } catch (error) {
            setError("An error occurred while fetching the profile.");
            setLoading(false);
        }
    }

    // Function to handle the service request
    async function handleRequestService(FreeLancername, customerName) {
        let data = {
          FreelancerName: FreeLancername,
          customerName: customerName,
        };
    
        if (FreeLancername == customerName) {
          alert("Cannot send request to own account")
          return
        }
    
      
        navigate("/request", { state: { FreelancerName: FreeLancername, customerName: customerName } });
    
    
    
        // const response = await fetch("http://localhost:5000/request", {
        //   method: "POST",
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(data),
        // });
    
        // const response_backend = await response.json();
        // alert(response_backend.message);
      }
    

    useEffect(() => {
        if (email) {
            handleViewProfile();
        }
    }, [email]);

    if (loading) {
        return (
            <div style={styles.container}>
                <h2>Loading profile...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.profileCard}>
                <h2 style={styles.header}>Freelancer Profile</h2>

              
                <div style={styles.field}>
                    <label style={styles.label}>Email: </label>
                    <span style={styles.value}>{userEmail}</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Profession: </label>
                    <span style={styles.value}>{pro}</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Rate per Hour: </label>
                    <span style={styles.value}>${rate}</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Product Delivery Time: </label>
                    <span style={styles.value}>{delivery}</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Description: </label>
                    <p style={styles.description}>{desc}</p>
                </div>

               
                <button style={styles.button} onClick={()=>handleRequestService(userEmail,user_name.name)}>
                    Request Service
                </button>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2e3b2f",
        minHeight: "100vh",
        padding: "20px",
    },
    profileCard: {
        backgroundColor: "#354f44",
        borderRadius: "10px",
        padding: "20px",
        color: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "800px",
        textAlign: "left",
        marginBottom: "20px",
    },
    header: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#a8d5ba",
    },
    field: {
        marginBottom: "15px",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "5px",
        display: "block",
        fontSize: "16px",
    },
    value: {
        fontSize: "16px",
        color: "#d3d3d3",
    },
    description: {
        fontSize: "14px",
        color: "#d3d3d3",
        lineHeight: "1.6",
    },
    button: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
        marginTop: "20px",
    },
};

export default FreeLancerProfile;

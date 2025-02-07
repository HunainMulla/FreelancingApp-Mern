import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Nav from './Nav';

const Profile = () => {
  const navigate = useNavigate();
  const { value: isLoggedIn } = useSelector((state) => state.islogged);
  const { value: userDetail } = useSelector((state) => state.userDetail);
  const { name, requests, orders } = userDetail;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!name) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div style={styles.mainContainer}>
        <div style={styles.container}>
          <div style={styles.profileCard}>
            <h2 style={styles.name}>{name || "Guest"}</h2>
            <br/>
            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => navigate("/orders", { state: { email: name } })}
                >
                  View Orders
                </button>
              </div>
              {/* <div style={styles.statItem}>
                <span style={styles.statLabel}>Requests:</span>
                <span style={styles.statValue}>{requests}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Orders:</span>
                <span style={styles.statValue}>{orders}</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    paddingTop: "60px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    padding: "40px 30px",
    textAlign: "center",
    width: "100%",
    maxWidth: "350px",
    marginTop: "20px",
  },
  name: {
    fontSize: "28px",
    fontWeight: "600",
    margin: "0",
    color: "#333",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "15px",
  },
  statItem: {
    textAlign: "center",
  },
  statLabel: {
    display: "block",
    color: "#555",
    fontWeight: "500",
    fontSize: "16px",
  },
  statValue: {
    display: "block",
    marginTop: "5px",
    color: "#3e64ff",
    fontWeight: "600",
    fontSize: "18px",
  },
  button: {
    backgroundColor: "#3e64ff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#1e3f8b",
    transform: "scale(1.05)",
  },
};

export default Profile;

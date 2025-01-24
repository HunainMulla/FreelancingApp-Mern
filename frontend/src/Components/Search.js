import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";


const Search = ({ onSearch }) => {
  
  const user = useSelector((state) => state.islogged.value);
  let navigate = useNavigate();
  
  useEffect(()=>{ 
    if(!user)
    {
      navigate('/login')
    }
  },[])

  // let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [val, setVal] = useState([]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    let obj = { query: query };
    try {
      const response = await fetch(`http://localhost:5000/home/${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        const data = await response.json();
        setVal(data);
      } else {
        alert("Error fetching data.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error occurred while fetching search results.");
    }
  };

  async function handleViewProfile(email) { 
    navigate('/some', { state: { email: email } });
  }

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search for freelancers or services"
        value={query}
        onChange={handleSearchChange}
        style={styles.input}
      />
      <button className="btn btn-sm btn-success my-3" onClick={handleSearchSubmit}>
        Search
      </button>

      <div style={styles.resultsContainer}>
        {val.length > 0 ? (
          <div>
            <h3>Search Results:</h3>
            <div style={styles.grid}>
              {val.map((item, index) => (
                <div key={index} style={styles.resultItem}>
                  <p>Email : {item.email}</p>
                  <p>Profession : {item.profession}</p>
                  <p>Description : {item.description}</p>

                  <button
                    onClick={() => handleViewProfile(item.email)}
                    className="btn btn-sm btn-success"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          query && <p>Try Searching with profession</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#3e64ff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  resultsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    width: "80%",
    maxWidth: "1200px",
  },
  resultItem: {
    padding: "20px",
    backgroundColor: "#f4f4f9",
    margin: "0",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  viewProfileButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  }
};

export default Search;

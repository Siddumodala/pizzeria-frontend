import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pizzas")
      .then((res) => setPizzas(res.data));
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Choose Your Pizza</h1>
      <div style={styles.grid}>
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            style={styles.card}
            onClick={() => navigate(`/toppings/${pizza.id}`, { state: pizza })}
          >
            
            <img
              src={`/images/${pizza.image}`}
              alt={pizza.name}
              style={styles.image}
            />
            <h3 style={styles.name}>{pizza.name}</h3>
            <p style={styles.desc}>{pizza.description}</p>
            <p style={styles.price}>₹{pizza.basePrice}</p>
            <button style={styles.btn}>Customize →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", background: "#fff9f5", minHeight: "100vh" },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#c0392b",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "1.5rem",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "transform 0.2s",
    ":hover": { transform: "scale(1.03)" },
  },
  image: {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
  borderRadius: '12px',
  marginBottom: '10px'
},
  name: { fontSize: "1.2rem", color: "#333", margin: "0.3rem 0" },
  desc: { color: "#888", fontSize: "0.85rem", marginBottom: "0.8rem" },
  price: { fontWeight: "bold", color: "#c0392b", fontSize: "1.1rem" },
  btn: {
    marginTop: "0.8rem",
    padding: "0.5rem 1.2rem",
    background: "#c0392b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

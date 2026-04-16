import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TOPPINGS = [
  { name: 'Extra Cheese', price: 40 },
  { name: 'Mushrooms', price: 30 },
  { name: 'Olives', price: 25 },
  { name: 'Jalapeños', price: 20 },
  { name: 'Bell Peppers', price: 25 },
  { name: 'Onions', price: 15 },
  { name: 'Corn', price: 20 },
  { name: 'Chicken Chunks', price: 60 },
  { name: 'Paneer', price: 50 },
  { name: 'Bacon Bits', price: 55 },
];

export default function Toppings() {
  const { state: pizza } = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggle = (topping) => {
    setSelected(prev =>
      prev.find(t => t.name === topping.name)
        ? prev.filter(t => t.name !== topping.name)
        : [...prev, topping]
    );
  };

  const toppingTotal = selected.reduce((s, t) => s + t.price, 0);
  const totalPrice = (pizza.basePrice + toppingTotal) * quantity;

  const addToCart = async () => {
    await axios.post(import.meta.env.VITE_API_URL+'/api/cart', {
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      pizzaImage: pizza.image,
      basePrice: pizza.basePrice,
      toppings: selected,
      quantity,
    });
    navigate('/cart');
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Customize: {pizza.name}</h2>
      <p style={styles.sub}>Base Price: ₹{pizza.basePrice}</p>

      <h3 style={styles.sectionTitle}>Select Toppings</h3>
      <div style={styles.grid}>
        {TOPPINGS.map(t => {
          const isSelected = !!selected.find(s => s.name === t.name);
          return (
            <div key={t.name} style={{ ...styles.chip, ...(isSelected ? styles.chipActive : {}) }}
              onClick={() => toggle(t)}>
              {isSelected ? '✅ ' : ''}{t.name} <span style={styles.tPrice}>+₹{t.price}</span>
            </div>
          );
        })}
      </div>

      <div style={styles.summary}>
        <div style={styles.qtyRow}>
          <span>Quantity:</span>
          <button style={styles.qBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
          <strong>{quantity}</strong>
          <button style={styles.qBtn} onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        <h3 style={styles.total}>Total: ₹{totalPrice}</h3>
        <button style={styles.cartBtn} onClick={addToCart}>Add to Cart 🛒</button>
      </div>
    </div>
  );
}

const styles = {
  page: { padding:'2rem', maxWidth:'700px', margin:'0 auto' },
  title: { fontSize:'1.8rem', color:'#c0392b' },
  sub: { color:'#555', marginBottom:'1.5rem' },
  sectionTitle: { marginBottom:'1rem', color:'#333' },
  grid: { display:'flex', flexWrap:'wrap', gap:'0.8rem', marginBottom:'2rem' },
  chip: { padding:'0.5rem 1rem', border:'2px solid #ddd', borderRadius:'20px',
    cursor:'pointer', fontSize:'0.9rem', background:'#fff' },
  chipActive: { border:'2px solid #c0392b', background:'#fff0ee', color:'#c0392b' },
  tPrice: { color:'#888', fontSize:'0.8rem' },
  summary: { background:'#fff9f5', borderRadius:'16px', padding:'1.5rem',
    boxShadow:'0 4px 20px rgba(0,0,0,0.07)' },
  qtyRow: { display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem', fontSize:'1.1rem' },
  qBtn: { padding:'0.3rem 0.9rem', fontSize:'1.2rem', border:'1px solid #ddd',
    borderRadius:'8px', cursor:'pointer', background:'#fff' },
  total: { color:'#c0392b', fontSize:'1.4rem', marginBottom:'1rem' },
  cartBtn: { width:'100%', padding:'0.8rem', background:'#c0392b', color:'#fff',
    border:'none', borderRadius:'10px', fontSize:'1.1rem', cursor:'pointer' }
};
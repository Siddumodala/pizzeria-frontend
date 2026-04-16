import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [items, setItems] = useState([]);

  const fetchCart = () => axios.get(import.meta.env.VITE_API_URL+"/api/cart")
    .then(res => setItems(res.data));

  useEffect(() => { fetchCart(); }, []);

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await axios.put(import.meta.env.VITE_API_URL+`/api/cart/${id}`, { quantity: qty });
    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(import.meta.env.VITE_API_URL+`/api/cart/${id}`);
    fetchCart();
  };

  const grandTotal = items.reduce((s, i) => s + i.totalPrice, 0);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛒 Your Cart</h2>
      {items.length === 0 ? (
        <p style={styles.empty}>Your cart is empty. Go pick a pizza!</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item._id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <h3 style={styles.pizzaName}>{item.pizzaName}</h3>
                  {item.toppings.length > 0 &&
                    <p style={styles.toppings}>
                      Toppings: {item.toppings.map(t => t.name).join(', ')}
                    </p>}
                </div>
                <div style={styles.priceBlock}>
                  <p style={styles.price}>₹{item.totalPrice}</p>
                </div>
              </div>
              <div style={styles.cardBottom}>
                <div style={styles.qtyRow}>
                  <button style={styles.qBtn} onClick={() => updateQty(item._id, item.quantity - 1)}>−</button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button style={styles.qBtn} onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
                </div>
                <button style={styles.removeBtn} onClick={() => removeItem(item._id)}>
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}
          <div style={styles.total}>
            Grand Total: <strong>₹{grandTotal}</strong>
          </div>
          <button style={styles.orderBtn}>Place Order ✅</button>
        </>
      )}
    </div>
  );
}

const styles = {
  page: { padding:'2rem', maxWidth:'700px', margin:'0 auto' },
  title: { fontSize:'1.8rem', color:'#c0392b', marginBottom:'1.5rem' },
  empty: { textAlign:'center', color:'#888', fontSize:'1.1rem', marginTop:'3rem' },
  card: { background:'#fff', borderRadius:'16px', padding:'1.2rem',
    marginBottom:'1rem', boxShadow:'0 4px 16px rgba(0,0,0,0.07)' },
  cardTop: { display:'flex', justifyContent:'space-between', marginBottom:'1rem' },
  pizzaName: { fontSize:'1.1rem', color:'#333', margin:0 },
  toppings: { color:'#888', fontSize:'0.82rem', marginTop:'0.3rem' },
  priceBlock: { textAlign:'right' },
  price: { fontWeight:'bold', color:'#c0392b', fontSize:'1.1rem' },
  cardBottom: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  qtyRow: { display:'flex', alignItems:'center', gap:'0.8rem' },
  qBtn: { padding:'0.3rem 0.8rem', border:'1px solid #ddd',
    borderRadius:'8px', cursor:'pointer', fontSize:'1rem', background:'#fff' },
  qty: { fontWeight:'bold', fontSize:'1rem' },
  removeBtn: { color:'#c0392b', background:'#fff0ee', border:'1px solid #f5b7b1',
    padding:'0.4rem 1rem', borderRadius:'8px', cursor:'pointer' },
  total: { textAlign:'right', fontSize:'1.3rem', color:'#333',
    marginTop:'1.5rem', marginBottom:'1rem' },
  orderBtn: { width:'100%', padding:'0.9rem', background:'#27ae60', color:'#fff',
    border:'none', borderRadius:'10px', fontSize:'1.1rem', cursor:'pointer' }
};
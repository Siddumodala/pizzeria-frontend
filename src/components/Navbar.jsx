import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" ><img src={logo} style={styles.brand} alt="" /></Link>
      <Link to="/cart" style={styles.cartBtn}>🛒 Cart</Link>
    </nav>
  );
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'1rem 2rem', background:'#c0392b', color:'#fff' },
  brand: { color:'#fff', fontWeight:'bold', fontSize:'1.4rem', textDecoration:'none',height:'60px',width:'60px',borderRadius:'100%' },
  cartBtn: { color:'#fff', textDecoration:'none', fontSize:'1rem',
    background:'rgba(255,255,255,0.2)', padding:'0.5rem 1rem', borderRadius:'8px' }
};
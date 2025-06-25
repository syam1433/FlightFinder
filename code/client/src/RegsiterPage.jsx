import React, { useState } from 'react';
import axios from 'axios';
import "./register.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user'
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Add approved: false for operator registration
    const payload = { ...formData };
    if (formData.role === "operator") {
      payload.approved = false;
    }

    const res = await axios.post('http://localhost:3000/api/auth/register', payload);

    // Show proper message for operator
    if (formData.role === "operator") {
      alert("Registration submitted. Awaiting admin approval.");
    } else {
      alert(res.data.message || "Registered successfully");
    }

    setFormData({ name: '', email: '', password: '', role: 'user' });

  } catch (err) {
    alert(err.response?.data?.message || 'Registration error');
  }
};


  return (
    <>
        <div className='full-app'>
            <div className='top'>
                <p  className='data1'>SB Flights</p>
                <div className='data2'>
                    <Link to="/" className="p">Home</Link>
                    <Link to="/login" className="p">Login</Link>
                </div>
            </div>
            <div className='mainform'>
                <div className='form'>
                    
                    <form onSubmit={handleSubmit} className="forms">
                        <p className='p'>Register</p>
                        <input className='name' name="name" value={formData.name} placeholder="Name" onChange={handleChange} required />
                        <input className='email' name="email" placeholder="Email" value={formData.email} type="email" onChange={handleChange} required />
                        <input className='password' name="password" placeholder="Password" value={formData.password} type="password" onChange={handleChange} required />

                        <select className='role' name="role" value={formData.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="operator">Operator</option>
                            <option value="admin">Admin</option>
                        </select>

                        <button type="submit" className="signup">Sign up</button>
                        <p>Already registered? <Link to="/login" className="p1">Login</Link></p>
                        
                    </form>
                </div>
            </div>

        </div>
    </>
  );
};

export default RegisterForm;

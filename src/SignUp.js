import React, { useState } from "react";
import "./App.css";
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const foodTypes = [
  "Appetizer",
  "Main Dish",
  "Side Dish",
  "Dessert",
  "Drinks",
  "Other"
];

export default function SignUp({ hasSignedUp, setHasSignedUp }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    foodType: "",
    foodDetails: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // IMPORTANT: Replace this with your Google Apps Script Web App URL
    const webAppUrl = "https://script.google.com/macros/s/AKfycbzZxAnIWGnqbCiLyeLTF9CD-PH1_5ujazzftPLpOPkRG3M9ksxOB607CZrhXw95-XSJfA/exec";

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Required for Google Apps Script
        },
      });

      const result = await response.json();

      if (result.message.startsWith('Error')) {
        throw new Error(result.message);
      }

      // --- Start: EmailJS Integration ---
      // Send confirmation email using EmailJS after successful sheet submission
      await emailjs.send(
        'service_a8sjlip',    // Replace with your EmailJS service ID
        'template_ophv8wn',   // Replace with your EmailJS template ID
        {
          to_email: form.email,
          to_name: form.firstName,
          // You can add any other form fields here as template variables
          // e.g., food_type: form.foodType
        },
        '8FEEvkg3pDYrp-N9k'        // Replace with your EmailJS User ID (or Public Key)
      );
      // --- End: EmailJS Integration ---
      
      setSubmitted(true);
      setHasSignedUp(true);

    } catch (error) {
      console.error('Error signing up:', error);
      setError("Failed to sign up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (hasSignedUp) {
    return (
      <div className="container">
        <div className="card">
          <h2>Thank you for signing up!</h2>
          <p>We look forward to seeing you at the potluck!</p>
          <button
            className="submit-btn"
            style={{ marginTop: '2rem' }}
            onClick={() => navigate('/users')}
          >
            See Who's Coming
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <div className="header">
          <span role="img" aria-label="turkey">🦃</span>
          <h1>Gobble 'Til You Wobble!</h1>
          <h2>You're Invited to Our Thanksgiving Potluck Feast!</h2>
          <p>
            Please fill out the information below. Fields marked with a <span className="required">*</span> are required.
          </p>
        </div>
        <div className="info">
          <p>🍂 <b>Date:</b> Thursday, November 28th, 2025</p>
          <p>🍁 <b>Time:</b> 4:00 PM - 8:00 PM</p>
          <p>🏡 <b>Location:</b> 5829 White Pebble Path MD</p>
          <p>🍽️ <b>Bring:</b> Your favorite dish to share (and your appetite!)</p>
          <p>👨‍👩‍👧‍👦 <b>Who:</b> Family & Friends (the more, the merrier!)</p>
        </div>
        <label>
          First Name <span className="required">*</span>
          <input name="firstName" value={form.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name <span className="required">*</span>
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>
        <label>
          Email <span className="required">*</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number (optional)
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} />
        </label>
        <label>
          What type of food are you bringing? <span className="required">*</span>
          <select name="foodType" value={form.foodType} onChange={handleChange} required>
            <option value="">Select an option</option>
            {foodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          What exactly are you bringing? <span className="required">*</span>
          <input
            name="foodDetails"
            placeholder="e.g., Pumpkin Pie, Chips, Lemonade"
            value={form.foodDetails}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Sign Up"}
        </button>
        <div className="footer">
          <p>
            Let's celebrate gratitude, good food, and great company!<br />
            <b>RSVP by November 20th</b>
          </p>
        </div>
      </form>
    </div>
  );
} 
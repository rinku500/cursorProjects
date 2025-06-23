import React, { useState, useEffect } from 'react';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      // IMPORTANT: Replace this with your Google Apps Script Web App URL
      const webAppUrl = "https://script.google.com/macros/s/AKfycbzZxAnIWGnqbCiLyeLTF9CD-PH1_5ujazzftPLpOPkRG3M9ksxOB607CZrhXw95-XSJfA/exec";

      try {
        const response = await fetch(webAppUrl);
        const data = await response.json();
        
        if (data.message && data.message.startsWith('Error')) {
          throw new Error(data.message);
        }

        setUsers(data);

      } catch (error) {
        console.error('Error fetching users:', error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="container"><h2>Loading Attendees...</h2></div>;
  }

  if (error) {
    return <div className="container"><p className="error-message">{error}</p></div>
  }

  return (
    <div className="container">
      <div className="card">
        <h2>🎉 Potluck Attendees 🎉</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Bringing</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 1 ? (
              users.slice(1).map((user, index) => (
                <tr key={index}>
                  <td>{user[0]}</td>
                  <td>{user[1]}</td>
                  <td>{user[4]}</td>
                  <td>{user[5]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No one has signed up yet. Be the first!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
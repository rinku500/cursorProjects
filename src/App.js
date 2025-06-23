import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import SignUp from "./SignUp";
import Users from "./Users";
import "./App.css";

const foodTypes = [
  "Appetizer",
  "Main Dish",
  "Side Dish",
  "Dessert",
  "Drinks",
  "Other"
];

export default function App() {
  return (
    <HashRouter>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Sign Up Form
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/users" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                See Who's Coming
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

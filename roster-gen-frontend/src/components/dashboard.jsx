// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome,FaUser, FaSignOutAlt, FaCalendarTimes, FaUsers } from 'react-icons/fa';
import './style.css';

function Dashboard() {
  return (
    <nav className="dashboard">
     <h2>Roster<span>-Gen</span></h2>
      <ul>
        <li>
          <Link to="/page1">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/page2">
            <FaUsers /> Nurses
          </Link>
        </li>
        <li>
          <Link to="/page3">
            <FaCalendarTimes/> Timetable
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser /> Profile
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Dashboard;

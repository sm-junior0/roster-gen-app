import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';

function Page1() {
  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Type to search" />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="navbar-icons">
          <FontAwesomeIcon icon={faBell} className="icon" />
          <FontAwesomeIcon icon={faUser} className="icon" />
        </div>
      </div>
      <div className="stats-container">
        <div className="stat-box blue">
          <h3>Sign ups</h3>
          <p className="stat-value">01</p>
          <p className="stat-change">+100% from last month</p>
        </div>
        <div className="stat-box green">
          <h3>Nurses</h3>
          <p className="stat-value">97</p>
          <p className="stat-change">+17.5% from last month</p>
        </div>
        <div className="stat-box red">
          <h3>Timetables</h3>
          <p className="stat-value">1</p> 
          <p className="stat-change">+10% from last month</p>
        </div>
      </div>
      <div className="content-container">
        <div className="timetable">
          <h3>Nurses' Timetable</h3>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Nurse</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>John Doe</td>
                <td>Morning</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>Jane Smith</td>
                <td>Evening</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>Emily Johnson</td>
                <td>Night</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>Michael Brown</td>
                <td>Morning</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>Sarah Davis</td>
                <td>Evening</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="notifications">
          <h3>Notifications</h3>
          <ul>
            <li>New comment <span className="time">21 days ago</span></li>
            <li>New comment <span className="time">21 days ago</span></li>
            <li>New comment <span className="time">21 days ago</span></li>
            <li className="show-all">Show all</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page1;

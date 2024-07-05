// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Page1 from './components/Home';
import Page2 from './components/Nurses';
import Timetable from './components/Timetable';
import Profile from './components/profile';
import Logout from './components/logout';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <main>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Timetable />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout/>} />z
        </Routes>
      </main>
    </div>
  );
}

export default App;

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function render() {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')
  );
}

render();
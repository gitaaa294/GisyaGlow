import React from "react";
import Dashboard from "./components/ProductList";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login_page';
import Finance from './components/Finance';
function App() {
  return (
    <Router>
      <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
    </Router>
  );
}

export default App;

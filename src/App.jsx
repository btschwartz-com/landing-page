import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import VIP from './pages/VIP';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setAccessToken={setAccessToken} />} />
        <Route path="/vip" element={<VIP accessToken={accessToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
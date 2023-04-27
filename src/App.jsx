import React from 'react';
import Home from './pages/Home.jsx';
import VIP from './pages/VIP';
import ErrorPage from './pages/404.jsx';

const CurrentPage = Home; // Can be Home, VIP, or ErrorPage

const App = () => {
  return (
    <div>
      <CurrentPage />
    </div>
  );
};

export default App;
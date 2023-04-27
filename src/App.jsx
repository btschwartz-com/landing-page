import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import Home from './pages/Home.jsx';
import VIP from './pages/VIP';
import MorePage from './pages/More.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vip" element={<VIP />} />
        <Route path="/more" element={<MorePage />} />
      </Routes>
    </Router>
  );
};

export default App;



/*
export default function App() {
  return (
    <BrowserRouter>
      <Links />
      <Route
        render={({ location }) => {
          return (
            <PageTransition
              preset="moveToLeftFromRight"
              transitionKey={location.pathname}
            >
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
              </Switch>
            </PageTransition>
          );
        }}
      />
    </BrowserRouter>
  );
}

HERE neeed to figure out how to do Link component with the button
*/

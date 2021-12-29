// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import LandingPage from './containers/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeapViz from './containers/HeapViz';

import './stylesheets/styles.scss';

const App = () => { // change back to landing page 
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={'/'} element={<HeapViz />} />
          <Route path={'/main'} element={<HeapViz />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

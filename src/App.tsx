// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import LandingPage from './containers/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HeapViz from './containers/HeapViz';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path ={'/'}
                    element={<LandingPage />}
                />
                <Route
                    path ={'/main'}
                    element={<HeapViz />}
                />
            </Routes>
        </Router>
    )
}

export default App;

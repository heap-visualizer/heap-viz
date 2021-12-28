// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import LandingPage from './containers/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path ={'/'}
                    element={<LandingPage />}
                />
            </Routes>
        </Router>
    )
}


export default App;

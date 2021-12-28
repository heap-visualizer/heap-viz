// import path from 'path/posix';
import React from 'react';
// import { render } from 'react-dom';
import { Outlet, Link } from 'react-router-dom';


const App = () => {

return (
    <div>
        <p>goodbye</p>
        <nav>
            <Link to='/dummy'>Dummy</Link> | {" "}
            <Link to='/dummer'>Dummer</Link>
        </nav>
        <Outlet />
    </div>
    )
}


export default App;

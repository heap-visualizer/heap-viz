import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginPage } from './LoginPage'
import { RegisterPage } from './SignUpPage'



function LandingPage() {
  const [changeToFormDisplay, setChangeToFormDisplay] = useState(true);
  const [formToDisplay, setFormToDisplay] = useState('login');

  const handleStartNow = () => {
    setChangeToFormDisplay(true);
  }

  const handleBackButton = () => {
    setChangeToFormDisplay(true);
    setFormToDisplay('login');
  }
  function guestLogin() {
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'guest', password: 'password' }),
    }).then((response) => {
      if (response.status === 200) {
        setGuest(true);
      }
    });
  }
  const [guest, setGuest] = useState(false);

  return (
    <div className='grid-container'>
      {
        <div>
          <Link to='/'>
            <button
              className='neon-button'
              type="button" onClick={handleBackButton}>Back
            </button>
          </Link>
        </div>
      }

      {
        !changeToFormDisplay && (
          <div className={"rightWrapper"}>
            <div className="buttonDiv">
              <button type='button' className='neon-button' onClick={handleStartNow}>
                Login
              </button>
              <button type='button' className='neon-button' onClick={guestLogin}>
                Free demo
              </button>
            </div>
          </div>
        )}

      {((changeToFormDisplay &&
        formToDisplay === 'login') && (<LoginPage setFormToDisplay={setFormToDisplay} />)) ||
        ((changeToFormDisplay &&
          formToDisplay === 'register') && (<RegisterPage setFormToDisplay={setFormToDisplay} />))}
      {guest && <Navigate to="/main" />}
    </div>
  );
}

export default LandingPage;

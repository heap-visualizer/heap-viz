import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './SignUpPage';

function LandingPage() {
  const [changeToFormDisplay, setChangeToFormDisplay] = useState(true);
  const [formToDisplay, setFormToDisplay] = useState('login');

  const handleStartNow = () => {
    setChangeToFormDisplay(true);
  };

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
  const [guest, setGuest] = useState(false); // TODO change

  return (
    <div className="grid-container">
      
      {!changeToFormDisplay && (
        <div className={'rightWrapper'}>
          <div className="buttonDiv">
            <button
              type="button"
              className="login-btn"
              onClick={handleStartNow}
            >
              Login
            </button>
            <button type="button" className="demo-btn" onClick={guestLogin}>
              Free demo
            </button>
          </div>
        </div>
      )}

      {(changeToFormDisplay && formToDisplay === 'login' && (
        <LoginPage setFormToDisplay={setFormToDisplay} />
      )) ||
        (changeToFormDisplay && formToDisplay === 'register' && (
          <RegisterPage setFormToDisplay={setFormToDisplay} />
        ))}
      {guest && <Navigate to="/main" />}
    </div>
  );
}

export default LandingPage;

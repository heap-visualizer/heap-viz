import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { Link, Navigate } from 'react-router-dom';
// import formik and yup libraries for form validation
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import async thunk - login
import { login, User } from '../slices/authentication';
// import reducer - clearMessage
import { clearMessage } from '../slices/messages';

export const LoginPage = (props: any) => {
  // disable login submit button if loading
  const { setFormToDisplay } = props;
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // access pieces of state from store
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);

  // dispatch method to dispatch an action and trigger a state change
  const dispatch = useAppDispatch();

  // if dispatch has been invoked, we want to run the clearMessage reducer
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const handleLogin = (formValue: User) => {
    // take in user's provided username and password
    const { username, password } = formValue;
    // disable login button by set loading to true
    setLoading(true);
    dispatch(login({ username, password }))
      .unwrap()
      .then((data) => {
        console.log('DATA', data);
        if (data.username) {
          setRedirect(true);
        } else throw new Error('login failed');
      })
      .catch(() => {
        // if login fails, enable login button again
        setLoading(false);
      });
  };

  const handleFormDisplay = () => setFormToDisplay('register');

  
  return (
    <div className="form-box">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      //handlelogin dispatches login() thunk
      >
        <Form>
          <h2 id="sign-in-text">Sign In</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              type="text"
              className="form-control"
              autoComplete="off"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className="form-control"
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <button type="submit" id="loginBtn" disabled={loading}>
            {loading && (
              <div className="spinner-border spinner-border-lg"></div>
            )}
            Login
          </button>
        </Form>
      </Formik>
      <p className="form-group">
        Don't have account?{' '}
        <button
          type="submit"
          className="neon-button"
          onClick={handleFormDisplay}
        >
          Register
        </button>
      </p>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}{' '}
          </div>
        </div>
      )}

      {redirect && <Navigate to="/main" />}
    </div>
  );
};

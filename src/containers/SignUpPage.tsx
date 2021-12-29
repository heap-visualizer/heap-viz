import React, { useState, useEffect } from "react";
import {Link, Navigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register, User } from "../slices/authentication";
import { clearMessage } from "../slices/messages";

export const RegisterPage = (props: any) => {
  const {setFormToDisplay} = props;  

  const [successful, setSuccessful] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 8 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 1 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 8 and 40 characters.",
        (val) =>
          val &&
          val.toString().length >= 1 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: User) => {
    const {username, password } = formValue;
    setSuccessful(false);

    dispatch(
      //register thunk 
      register({username, password}))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    };

    const handleFormDisplay = () => setFormToDisplay('login');

  return (
    <div>

    {!successful && (
          <div className="form-box">

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
          <h2 id="sign-in-text">  
              Register
            </h2>
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

                <div className="form-group">
                  <button type="submit" id="loginBtn">Register</button>
                </div>

                <p className="form-group">
                  Already have an account? <button type = "submit" className="neon-button" onClick={handleFormDisplay} >Sign In</button>
                </p>
          </Form>        
        </Formik>
        </div>
        )}
      
        
        {
        message && (
          <div className="form-box">
            
            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
              {message}
            </div>

            <div className="spinner-border spinner-border-sm" />
          
          </div>
         )
        }
      {successful && setTimeout(() => setFormToDisplay('login'), 1000)}
    </div>
  );
};
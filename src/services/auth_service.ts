/*
Make asynchronous HTTP requests
*/
import axios from 'axios';

const API_URL = '/mariposa/auth/';



export const register = (username: string, password: string) => {
  //make a post request to the server
  return axios.post(API_URL + 'signup', {username, password});
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + 'signin', {username, password})
    .then((response) => {
      if (response.data.accessToken) {
        //set local storage key/value pair
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch(error => {
      return error.message;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

//available authService functions - definitions below  
export const authService = {
  register,
  login,
  logout,
};

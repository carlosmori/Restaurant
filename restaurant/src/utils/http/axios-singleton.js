import axiosInstance from 'axios'
// const AUTHORIZATION_KEY_NAME = 'Token'

const axios = axiosInstance.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      return Promise.reject('Email or Password invalid')
    } else {
      return Promise.reject(error)
    }
  }
)

// const setAuthorization = authorization => {
//   if (authorization) {
//     http.defaults.headers.common["Authorization"] = authorization;
//     localStorage.setItem(AUTHORIZATION_KEY_NAME, authorization);
//   }
// };
// const unSetAuthorization = () =>
//   localStorage.removeItem(AUTHORIZATION_KEY_NAME);

// @todo isLoggedIn()
// const isLoggedIn = () => localStorage.getItem(AUTHORIZATION_KEY_NAME);

// export { axios, setAuthorization, unSetAuthorization, isLoggedIn };
export {axios}

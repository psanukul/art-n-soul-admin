import axios from "axios";

// This code is used to access redux store in this file.
let store;
export const injectStore = (_store) => {
  store = _store;
};

// Creating new axios instance
export const instance = axios.create({
  withCredentials: true,
  baseURL: `https://art-n-soul-backend.onrender.com/api/v1`,
});

instance.interceptors.response.use(
  (response) => {
    // save username from response in redux or localstorage for future use and when calling use it in userName variable while generating refresh token
    return response;
  },
  async (error) => {
    console.log(error);

    let errorMessage = "";

    switch (Number(error.response.status)) {
      case 400:
        errorMessage = error.response.data.message || "Bad Request";
        break;
      case 401:
        errorMessage = error.response.data.message || "Unauthorized Access";
        break;

      case 404:
        errorMessage = error.response.data.message || "Resource Not Found";
        break;

      case 500:
        errorMessage = error.response.data.message || "Internal Server Error";
        break;

      default:
        errorMessage =
          error.response.data.message ||
          "Sorry, something went wrong. Please try again later.";
    }
    return Promise.reject(errorMessage);
  }
);

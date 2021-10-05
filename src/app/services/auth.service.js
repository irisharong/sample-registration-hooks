import axios from "axios";

const API_URL = "https://localhost:8080/api/auth/";

const createUser = (data) => {
  return  new Promise((resolve, reject) => {
    axios.post(API_URL + "signup", data).then((response) => {
      if (response.data.message !== undefined) {
        resolve(response.data);
      } else {
        reject(response.data);
      }
    })
    .catch((error) => {
      reject(error.response.data);
    });
  });
  
};

const createEmployer = (data) => {
  return  new Promise((resolve, reject) => {
    axios.post(API_URL + "signup", data).then((response) => {
      if (response.data.message !== undefined) {
        resolve(response.data);
      } else {
        reject(response.data);
      }
    })
    .catch((error) => {
      reject(error.response.data);
    });
  });
  
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const confirm = (token, email) => {
  return  new Promise((resolve, reject) => {
    axios.post(API_URL + "verify", {
      token, email,
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error.response.data);
    });
  });
}

const logout = () => {
  localStorage.removeItem("user");
};



export default {
  createUser,
  createEmployer,
  login,
  confirm,
  logout,
};
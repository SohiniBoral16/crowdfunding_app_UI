import axios from "axios";

const API_URL = "http://localhost:8081/api/users";

//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
// const token = localStorage.getItem("authToken");
// console.log("Token: " + token);

// const setAuthToken = (token) => {
//   if (token) {
//     // Apply the token to every request header
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     // Delete the auth header
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };

export const getUsers = async () => {
  //setAuthToken(localStorage.getItem("authToken"));
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser = async (email, password, name, role) => {
  //setAuthToken(localStorage.getItem("authToken"));
  const response = await axios.post(API_URL, {
    email: email,
    passwordHash: password,
    name: name,
    role: role,
  });
  return response.data;
};

export const deleteUser = async (id) => {
  //setAuthToken(localStorage.getItem("authToken"));
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, user) => {
  //setAuthToken(localStorage.getItem("authToken"));
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// export const getJwtToken = async (username, password) => {
//   const response = await axios.post(`http://localhost:8081/authenticate`, {
//     username: username,
//     password: password,
//   });
//   localStorage.setItem("authToken", response.data.jwt); // Store the jwt token into localStorage
//   setAuthToken(response.data.jwt);
//   return response.data;
// };

// Set an axios interceptor to handle 401 responses
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Use the refresh token to obtain a new JWT
//       const refreshToken = localStorage.getItem("refreshToken");
//       const res = await axios.post(`http://localhost:8081/refresh-token`, {
//         refreshToken,
//       });

//       if (res.status === 200) {
//         // Update the tokens in localStorage and set the new JWT as the authorization header
//         localStorage.setItem("authToken", res.data.jwt);
//         localStorage.setItem("refreshToken", res.data.refreshToken);
//         axios.defaults.headers.common["Authorization"] =
//           "Bearer " + res.data.jwt;

//         // Retry the original request with the new JWT
//         originalRequest.headers["Authorization"] = "Bearer " + res.data.jwt;
//         return axios(originalRequest);
//       }

// If refreshing the token failed, log out
//       logoutUser();
//     }

//     return Promise.reject(error);
//   }
// ); // This parenthesis closes the `axios.interceptors.response.use` block

export const loginUser = async (email, password) => {
  //setAuthToken(localStorage.getItem("authToken"));
  const response = await axios.post(`${API_URL}/login`, {
    email: email,
    passwordHash: password,
  });
  return response.data;
};

export const logoutUser = async () => {
  // Remove the user's information from local storage to log them out
  localStorage.removeItem("authToken");
  // setAuthToken(null);
  // localStorage.removeItem("authToken");
  // localStorage.removeItem("refreshToken");
  // delete axios.defaults.headers.common["Authorization"];
};

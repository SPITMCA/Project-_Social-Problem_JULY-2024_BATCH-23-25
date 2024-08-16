import { jwtDecode } from "jwt-decode";
import http from "./http.service";

const tokenKey = "token";

const loginWithJwt = (jwt) => {
    localStorage.setItem(tokenKey, jwt);
};

const getJwt = () => localStorage.getItem(tokenKey);

// const getCurrentUser = () => {
//     try {
//         const jwt = localStorage.getItem(tokenKey);
//         if (jwt) {
//             const base64Url = jwt.split('.')[1];
//             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//             const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             }).join(''));
//             return JSON.parse(jsonPayload);
//         }
//     } catch (ex) {
//         return null;
//     }
// };

const getCurrentUser = () => {
    try {
        const jwt = getJwt();
        if (jwt) {
            const decodeToken = jwtDecode(jwt);

            const currentTime = Math.floor(Date.now() / 1000);

            if (decodeToken.exp < currentTime) {
                return null;
            }
            return decodeToken;
        }
        return null;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const signup = async (signupData) => {
    try {
        const response = await http.post("auth/signup", signupData);
        if (response.data.token) {
            loginWithJwt(response.data.token);
        }
        return response.data;
    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
};

const login = async (email, password) => {
    try {
        const response = await http.post("auth/login", { email, password });
        if (response.data.token) {
            loginWithJwt(response.data.token);
        }
        return response.data;
    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
};

const logout = () => {
    localStorage.removeItem(tokenKey);
    window.location = "/home"
};

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt,
    signup
};
import http from "./Axios-Config";


const verifyLogin = user => {
  return http.post('/login',{
      username: user.username,
      password: user.password,
      withCredentials: true
    });
}

const logout = () => {
    return http.delete('/login');
}

const axiosRequest = {
    verifyLogin,
    logout
}

// Export "Methods"
export default axiosRequest;

import axios from './axios';

const login = async (email, password) => {
  try {
    const response = await axios.post(`/auth`, {
      email,
      password,
    });

    if (response.data && !response.data.error && response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const registerOrLogin = async (data) => {
  try {
    const response = await axios.post(`/auth/firebase`, data);

    if (response.data && !response.data.error && response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`/auth/logout`, {});

    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const authService = {
  login,
  registerOrLogin,
  logout,
};

export default authService;

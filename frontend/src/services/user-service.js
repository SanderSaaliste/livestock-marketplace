import axios from './axios';

const registerUser = async (data) => {
  try {
    const response = await axios.post('/user', data);

    if (response.data && !response.data.error && response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getMyUser = async () => {
  try {
    const response = await axios.get('/user/me');

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const userService = {
  registerUser,
  getMyUser,
};

export default userService;

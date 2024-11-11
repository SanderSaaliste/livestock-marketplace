import axios from './axios';

const registerUser = async (data) => {
  try {
    const response = await axios.post('/user', data);

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

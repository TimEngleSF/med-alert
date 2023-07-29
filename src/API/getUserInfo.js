import axios from 'axios';

const getUserInfo = async (username) => {
  try {
    const data = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/userInfo/${username}`,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export default getUserInfo;

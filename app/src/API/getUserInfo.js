import axios from 'axios';
const IP = import.meta.env.VITE_APP_SIP;
const PORT = import.meta.env.VITE_APP_SPORT;

const getUserInfo = async (username) => {
  try {
    const data = await axios({
      method: 'GET',
      url: `http://${IP}:${PORT}/api/userInfo/${username}`,
    });
    return data;
  } catch (err) {
    return err;
  }
};

export default getUserInfo;

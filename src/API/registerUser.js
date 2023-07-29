const IP = import.meta.env.VITE_APP_SIP;
const PORT = import.meta.env.VITE_APP_SPORT;
import axios from 'axios';

const registerUser = async (payload) => {
  try {
    const data = await axios({
      method: 'POST',
      url: `http://${IP}:${PORT}/api/auth/register`,
      data: payload,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default registerUser;

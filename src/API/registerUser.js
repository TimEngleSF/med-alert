const IP = import.meta.env.VITE_APP_SIP;
const PORT = import.meta.env.VITE_APP_SPORT;
import axios from 'axios';

const registerUser = async (payload) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `http://${IP}:${PORT}/api/auth/register`,
      data: payload,
    });
    return response;
  } catch (err) {
    console.error('Error making request:', err.message);
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
    }
  }
};

export default registerUser;

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import UserContext from '../../store/user-info-context';

const IP = import.meta.env.VITE_APP_SIP;
const PORT = import.meta.env.VITE_APP_SPORT;

const LoginForm = ({ setShowRegister }) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const changeHandler = (setter) => (e) => {
    setter(e.target.value);
  };

  const loginAccount = async () => {
    try {
      const data = await axios({
        method: 'POST',
        url: `http://${IP}:${PORT}/api/auth/login`,
        data: { email: emailValue, password: passwordValue },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailValue || !passwordValue) {
      return;
    }

    const response = await loginAccount();

    if (response.status === 201) {
      const { username, token } = response.data;

      userCtx.setAuthToken(token);
      localStorage.setItem('jwt', token);

      navigate(`/user/${username}`);
    }
  };

  const handleRegClick = () => {
    setShowRegister(true);
  };

  return (
    <div className="w-full">
      <form
        className="w-3/4 mx-auto bg-white h-92  p-6 rounded-lg shadow-md"
        onSubmit={submitHandler}
      >
        <h2 className="mb-6 text-xl">Login</h2>
        <div className="text-sm mb-8">
          <label className="flex flex-col mb-4">
            <span className="font-thin  mb-1">Email</span>
            <input
              type="email"
              className="h-8 outline outline-1 indent-1 rounded-md"
              onChange={changeHandler(setEmailValue)}
              value={emailValue}
            />
          </label>
          <label className="flex flex-col">
            <span className="font-thin mb-1">Password</span>
            <input
              type="password"
              className="h-8 outline outline-1 indent-1 rounded-md"
              onChange={changeHandler(setPasswordValue)}
              value={passwordValue}
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="cursor-pointer h-8 bg-red-500 text-white rounded-md"
          >
            Login
          </button>
          <button
            type="button"
            className="outline h-8 outline-2 cursor-pointer rounded-md"
            onClick={handleRegClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  setShowRegister: PropTypes.func,
};

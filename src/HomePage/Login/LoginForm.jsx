import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const LoginForm = ({ setShowRegister }) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const changeHandler = (setter) => (e) => {
    setter(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!emailValue || !passwordValue) {
      return;
    }
    loginAccount();
  };

  const loginAccount = async () => {
    try {
      const data = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/auth/login',
        data: { email: emailValue, password: passwordValue },
      });
    } catch (err) {
      console.error(err);
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
            Regiser
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

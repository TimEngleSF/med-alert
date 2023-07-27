import PropTypes from 'prop-types';

import FormInput from '../Utilities/FormInput';
import Button from '../Utilities/Button';
import { useContext } from 'react';
import UserContext from '../../store/user-info-context';
const UserInfo = ({ setRegistrationPage, setShowRegister }) => {
  const userCtx = useContext(UserContext);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleLoginClick = () => {
    console.log('Clicked');
    setShowRegister(false);
  };

  const onRegistration = () => {
    setRegistrationPage('medicine');
  };

  //////Need to reach out to DB and check if username or email already exist

  return (
    <>
      <h2>Register</h2>
      <div className="text-sm mb-8">
        <FormInput
          text="Full Name"
          type="text"
          value={userCtx.fullNameValue}
          onChange={handleChange(userCtx.setFullNameValue)}
        />
        <FormInput
          text="Username"
          type="text"
          value={userCtx.usernameValue}
          onChange={handleChange(userCtx.setUsernameValue)}
        />
        <FormInput
          text="Email"
          type="email"
          onChange={handleChange(userCtx.setEmailValue)}
          value={userCtx.emailValue}
        />
        <FormInput
          text="Password"
          type="password"
          onChange={handleChange(userCtx.setPasswordValue)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button
          text="Register"
          type="button"
          bgColor="bg-red-500"
          textColor="text-white"
          onClick={onRegistration}
        />
        <Button text="Login" onClick={handleLoginClick} />
      </div>
    </>
  );
};

UserInfo.propTypes = {
  setRegistrationPage: PropTypes.func,
  setShowRegister: PropTypes.func,
};
export default UserInfo;

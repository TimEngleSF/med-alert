import PropTypes from 'prop-types';

import FormInput from '../Utilities/FormInput';
import Button from '../Utilities/Button';
const UserInfo = ({
  usernameValue,
  emailValue,
  passwordValue,
  setUsernameValue,
  setEmailValue,
  setPasswordValue,
  setRegistrationPage,
  setShowRegister,
}) => {
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
          text="Username"
          type="text"
          value={usernameValue}
          onChange={handleChange(setUsernameValue)}
        />
        <FormInput
          text="Email"
          type="email"
          onChange={handleChange(setEmailValue)}
          value={emailValue}
        />
        <FormInput
          text="Password"
          type="password"
          onChange={setPasswordValue}
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
  usernameValue: PropTypes.string,
  emailValue: PropTypes.string,
  passwordValue: PropTypes.string,
  setRegistrationPage: PropTypes.func,
  setUsernameValue: PropTypes.func,
  setEmailValue: PropTypes.func,
  setPasswordValue: PropTypes.func,
  setShowRegister: PropTypes.func,
};
export default UserInfo;

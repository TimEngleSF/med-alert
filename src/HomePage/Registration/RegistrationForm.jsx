import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';

const RegistrationForm = ({ setShowRegister }) => {
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [medicines, setMedicines] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [registrationPage, setRegistrationPage] = useState('user');
  useEffect(() => {
    console.log(usernameValue);
  }, [usernameValue]);

  return (
    <div className="w-full">
      <form className="w-3/4 mx-auto bg-white h-92  p-6 rounded-lg shadow-md">
        {registrationPage === 'user' && (
          <UserInfo
            setUsernameValue={setUsernameValue}
            setEmailValue={setEmailValue}
            setPasswordValue={setPasswordValue}
            setRegistrationPage={setRegistrationPage}
            setShowRegister={setShowRegister}
          />
        )}
      </form>
    </div>
  );
};

RegistrationForm.propTypes = {
  setShowRegister: PropTypes.func,
};

export default RegistrationForm;

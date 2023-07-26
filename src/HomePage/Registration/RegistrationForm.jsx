import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';
import MedicinceInfo from './Medicine/MedicineInfo';
import ContactsInfo from './Contacts/ContactInfo';

const RegistrationForm = ({ setShowRegister }) => {
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [medicines, setMedicines] = useState([]);

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [physicianContacts, setPhysicianContacts] = useState([]);

  const [registrationPage, setRegistrationPage] = useState('user');
  useEffect(() => {
    console.log(usernameValue);
  }, [usernameValue]);

  return (
    <div className="w-full">
      <form className="w-3/4 mx-auto bg-white h-92  p-6 rounded-lg shadow-md">
        {registrationPage === 'user' && (
          <UserInfo
            usernameValue={usernameValue}
            emailValue={emailValue}
            passwordValue={passwordValue}
            setUsernameValue={setUsernameValue}
            setEmailValue={setEmailValue}
            setPasswordValue={setPasswordValue}
            setRegistrationPage={setRegistrationPage}
            setShowRegister={setShowRegister}
          />
        )}
        {registrationPage === 'medicine' && (
          <MedicinceInfo
            medicines={medicines}
            setRegistrationPage={setRegistrationPage}
            setMedicines={setMedicines}
          />
        )}
        {registrationPage === 'contact' && (
          <ContactsInfo
            emergencyContacts={emergencyContacts}
            physicianContacts={physicianContacts}
            setEmergencyContacts={setEmergencyContacts}
            setPhysicianContacts={setPhysicianContacts}
            setRegistrationPage={setRegistrationPage}
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

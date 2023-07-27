import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../store/user-info-context';

import UserInfo from './UserInfo';
import MedicinceInfo from './Medicine/MedicineInfo';
import ContactsInfo from './Contacts/ContactInfo';

const RegistrationForm = ({ setShowRegister }) => {
  // const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [medicines, setMedicines] = useState([]);

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [physicianContacts, setPhysicianContacts] = useState([]);

  const [registrationPage, setRegistrationPage] = useState('contacts');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      user: {
        name: usernameValue,
        emailValue: emailValue,
        password: passwordValue,
      },
      medicines: medicines,
      contacts: {
        emergency: emergencyContacts,
        physicians: physicianContacts,
      },
    };
  };

  return (
    <div className="w-full">
      <form className="w-3/4 mx-auto bg-white h-92  p-6 rounded-lg shadow-md">
        {registrationPage === 'user' && (
          <UserInfo
            emailValue={emailValue}
            passwordValue={passwordValue}
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
        {registrationPage === 'contacts' && (
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

import { useContext, useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../../store/user-info-context';
import registerUser from '../../API/registerUser';

import UserInfo from './UserInfo';
import MedicinceInfo from './Medicine/MedicineInfo';
import ContactsInfo from './Contacts/ContactInfo';

const RegistrationForm = ({ setShowRegister }) => {
  // const [usernameValue, setUsernameValue] = useState('');

  const [medicines, setMedicines] = useState([]);

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [physicianContacts, setPhysicianContacts] = useState([]);

  const [registrationPage, setRegistrationPage] = useState('user');
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user: {
        name: userCtx.fullNameValue,
        username: userCtx.usernameValue,
        email: userCtx.emailValue,
        password: userCtx.passwordValue,
      },
      medicines: userCtx.medicines,
      contacts: {
        emergency: userCtx.emergencyContacts,
        physicians: userCtx.physicianContacts,
      },
    };
    try {
      const response = await registerUser(payload);
      if (response.status === 201) {
        navigate(`/user/${response.data.user.username}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <form
        className="w-3/4 mx-auto bg-white h-92  p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {registrationPage === 'user' && (
          <UserInfo
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

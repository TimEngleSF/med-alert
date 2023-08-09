import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../../store/user-info-context';
import registerUser from '../../API/registerUser';

import UserInfo from './UserInfo';
import MedicinceInfo from './Medicine/MedicineInfo';
import ContactsInfo from './Contacts/ContactInfo';

const RegistrationForm = ({ setShowRegister }) => {
  // State for the form's data
  const [medicines, setMedicines] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [physicianContacts, setPhysicianContacts] = useState([]);

  // State for the current page of the form
  const [registrationPage, setRegistrationPage] = useState('user');

  // Context for user information
  const userCtx = useContext(UserContext);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the server
    const payload = {
      user: {
        name: userCtx.fullNameValue,
        username: userCtx.usernameValue.toLowerCase(),
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
      // Send the data to the server
      const response = await registerUser(payload);

      // If the server responds with a status of 201 (Created), update the user context with the new data
      if (response.status === 201) {
        const { user, medicines, contacts, token } = response.data;

        // Update the user context
        userCtx.setUsernameValue(user.username);
        userCtx.setFullNameValue(user.fullNameValue);
        userCtx.setEmailValue(user.email);
        userCtx.setQrCode(user.qrCode);
        userCtx.setAllergies(user.allergies);
        userCtx.setMedicines(medicines);
        userCtx.setEmergencyContacts(contacts.contacts.emergency);
        userCtx.setPhysicianContacts(contacts.contacts.physicians);
        userCtx.setAuthToken(token);

        // Navigate to the new user's page
        navigate(`/user/${response.data.user.username.toLowerCase()}`);
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

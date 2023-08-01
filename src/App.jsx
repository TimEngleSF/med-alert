import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './store/user-info-context';
import HomePage from './HomePage/HomePage';
import UserPage from './User/UserPage';
import QRModal from './QRModal';
import ContactsModal from './ContactsModal';

import './App.css';
import GuestPage from './Guest/GuestPage';
// import getUserInfo from './API/getUserInfo';

function App() {
  /////////BUG SET UP USE CONTEXT!!!!!!
  const [fullNameValue, setFullNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [allergies, setAllergies] = useState('');

  const [medicines, setMedicines] = useState([]);

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [physicianContacts, setPhysicianContacts] = useState([]);

  const [showQR, setShowQR] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const [authToken, setAuthToken] = useState('');

  return (
    <UserContext.Provider
      value={{
        fullNameValue: fullNameValue,
        usernameValue: usernameValue,
        emailValue: emailValue,
        passwordValue: passwordValue,
        medicines: medicines,
        emergencyContacts: emergencyContacts,
        physicianContacts: physicianContacts,
        qrCode: qrCode,
        allergies: allergies,
        showQR: showQR,
        showContacts: showContacts,
        authToken: authToken,

        setFullNameValue: setFullNameValue,
        setUsernameValue: setUsernameValue,
        setEmailValue: setEmailValue,
        setPasswordValue: setPasswordValue,
        setMedicines: setMedicines,
        setEmergencyContacts: setEmergencyContacts,
        setPhysicianContacts: setPhysicianContacts,
        setQrCode: setQrCode,
        setAllergies: setAllergies,
        setShowQR: setShowQR,
        setShowContacts: setShowContacts,
        setAuthToken: setAuthToken,
      }}
    >
      <div className="container bg-cyan-50 h-full py-6 mx-auto max-w-[542px]">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/user/:username/guest" element={<GuestPage />} />
          </Routes>
        </Router>
        {showQR && <QRModal />}
        {showContacts && <ContactsModal />}
      </div>
    </UserContext.Provider>
  );
}

export default App;

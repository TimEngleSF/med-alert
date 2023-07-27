import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './store/user-info-context';
import HomePage from './HomePage/HomePage';

import './App.css';
// import getUserInfo from './API/getUserInfo';

function App() {
  /////////BUG SET UP USE CONTEXT!!!!!!
  const [fullNameValue, setFullNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [medicines, setMedicines] = useState([]);

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [physicianContacts, setPhysicianContacts] = useState([]);
  useEffect(() => {
    console.log(passwordValue);
  }, [passwordValue]);

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

        setFullNameValue: setFullNameValue,
        setUsernameValue: setUsernameValue,
        setEmailValue: setEmailValue,
        setPasswordValue: setPasswordValue,
        setMedicines: setMedicines,
        setEmergencyContacts: setEmergencyContacts,
        setPhysicianContacts: setPhysicianContacts,
      }}
    >
      <div className="container bg-cyan-50 h-full py-6 mx-auto max-w-[542px]">
        <header>
          <h1 className="text-4xl mb-10 text-center tracking-[0.225em] font-bold">
            MediAlert*
          </h1>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/user/:username" element={<UserPage />} /> */}
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );

  // return (
  //   <div className="container bg-blue-50 h-full py-6">
  //     <header>
  //       <h1 className="text-3xl mb-4">MediAlert*</h1>
  //     </header>
  //     <main>
  //       <List meds={meds} setMeds={setMeds} />
  //     </main>
  //   </div>
  // );
}

export default App;

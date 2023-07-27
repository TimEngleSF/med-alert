import { useState } from 'react';
import LoginForm from './Login/LoginForm';
import RegistrationForm from './Registration/RegistrationForm';
const HomePage = () => {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <main className="flex justify-center items-center">
      {!showRegister && <LoginForm setShowRegister={setShowRegister} />}
      {showRegister && <RegistrationForm setShowRegister={setShowRegister} />}
    </main>
  );
};

export default HomePage;

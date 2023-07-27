import { useEffect, useState } from 'react';
import LoginForm from './Login/LoginForm';
import RegistrationForm from './Registration/RegistrationForm';
const HomePage = () => {
  const [showRegister, setShowRegister] = useState(true);
  useEffect(() => {
    console.log('showRegister: ', showRegister);
  }, [showRegister]);
  return (
    <main className="flex justify-center items-center">
      {!showRegister && <LoginForm setShowRegister={setShowRegister} />}
      {showRegister && <RegistrationForm setShowRegister={setShowRegister} />}
    </main>
  );
};

export default HomePage;

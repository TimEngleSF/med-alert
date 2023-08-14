import { useState } from 'react';
import LoginForm from './Login/LoginForm';
import RegistrationForm from './Registration/RegistrationForm';
const HomePage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header>
        <h1 className="text-4xl mb-10 text-center tracking-[0.225em] font-bold">
          MediAlert*
        </h1>
      </header>
      <main className="flex justify-center items-center">
        {!showRegister && <LoginForm setShowRegister={setShowRegister} />}
        {showRegister && <RegistrationForm setShowRegister={setShowRegister} />}
      </main>
    </>
  );
};

export default HomePage;

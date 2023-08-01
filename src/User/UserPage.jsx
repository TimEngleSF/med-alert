import { useContext, useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../store/user-info-context';
import MedicineList from './List/MedicineList';

const IP = import.meta.env.VITE_APP_SIP;
const PORT = import.meta.env.VITE_APP_SPORT;

//  TODO NEED TO ADD AUTHENTICATION FOR THESE REQUESTS, REMEMBER WE NEED THEM FOR THE UPDATES AS WELL
const UserPage = () => {
  const userCtx = useContext(UserContext);
  const { username } = useParams();

  // Load JWT token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    let tokenToConsume;
    if (storedToken) {
      tokenToConsume = storedToken;
      userCtx.setAuthToken(storedToken);
    } else {
      tokenToConsume = userCtx.authToken;
    }

    const fetchUserData = async () => {
      const response = await axios({
        method: 'GET',
        url: `http://${IP}:${PORT}/api/userInfo/${username}`,
        headers: {
          Authorization: `Bearer ${tokenToConsume}`,
        },
      });

      const { user, medicines, contacts } = response.data;

      userCtx.setUsernameValue(user.username);
      userCtx.setFullNameValue(user.fullNameValue);
      userCtx.setEmailValue(user.email);
      userCtx.setQrCode(user.qrCode);
      userCtx.setAllergies(user.allergies);

      userCtx.setMedicines(medicines);

      userCtx.setEmergencyContacts(contacts.emergency);
      userCtx.setPhysicianContacts(contacts.physicians);
    };

    fetchUserData();
  }, []);

  console.log('Check userContext 2', userCtx.authToken);

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: `http://${IP}:${PORT}/api/userInfo/${username}`,
  //     headers: {
  //       Authorization: `Bearer ${userCtx.authToken}`,
  //     },
  //   }).then((response) => {
  //     const { user, medicines, contacts } = response.data;
  //     console.log('Check2');
  //     userCtx.setUsernameValue(user.username);
  //     userCtx.setFullNameValue(user.fullNameValue);
  //     userCtx.setEmailValue(user.email);
  //     userCtx.setQrCode(user.qrCode);
  //     userCtx.setAllergies(user.allergies);

  //     userCtx.setMedicines(medicines);

  //     userCtx.setEmergencyContacts(contacts.emergency);
  //     userCtx.setPhysicianContacts(contacts.physicians);
  //   });
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios({
        method: 'GET',
        url: `http://${IP}:${PORT}/api/userInfo/${username}`,
        headers: {
          Authorization: `Bearer ${userCtx.authToken}`,
        },
      });

      const { user, medicines, contacts } = response.data;

      userCtx.setUsernameValue(user.username);
      userCtx.setFullNameValue(user.fullNameValue);
      userCtx.setEmailValue(user.email);
      userCtx.setQrCode(user.qrCode);
      userCtx.setAllergies(user.allergies);

      userCtx.setMedicines(medicines);

      userCtx.setEmergencyContacts(contacts.emergency);
      userCtx.setPhysicianContacts(contacts.physicians);
    };

    fetchUserData();
  }, []);

  useContext(() => {
    if (!userCtx.username) {
      return (
        <div className="h-[90%] flex items-center justify-center">
          <Dna
            visible={true}
            height="120"
            width="120"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      );
    }
  }, []);
  const handleQRClick = () => {
    userCtx.setShowQR(true);
  };
  const handleContactsClick = () => {
    userCtx.setShowContacts(true);
  };
  return (
    <>
      <header className="flex justify-between mb-10 px-3">
        <h1 className="text-xl tracking-[0.225em] font-bold">MediAlert*</h1>
        <ul className=" flex gap-10">
          <li>
            <a
              className=" text-lg text-red-500 cursor-pointer hover:text-red-600 hover:border-b-2 border-b-red-600 hover:py-0.5 duration-300"
              onClick={handleQRClick}
            >
              QR
            </a>
          </li>
          <li>
            <a
              className=" text-lg text-red-500 cursor-pointer hover:text-red-600 hover:border-b-2 border-b-red-600 hover:py-0.5 duration-300"
              onClick={handleContactsClick}
            >
              CONTACTS
            </a>
          </li>
        </ul>
      </header>
      <main>
        <MedicineList />
      </main>
    </>
  );
};
export default UserPage;
